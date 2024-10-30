const amqp = require('amqplib/callback_api');
const { sendWsMessage } = require('./ws');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const CLOUDAMQP_URL = process.env.CLOUDAMQP_URL;
const COLLAB_SERVICE_URL = "http://localhost:8003";

function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function checkSubset(parentArray, subsetArray) {
  return subsetArray.every((el) => {
      return parentArray.includes(el)
  });
}

// In-memory store to track unmatched users
let unmatchedUsers = [];

// Function to set up RabbitMQ consumer
const setupConsumer = () => {
  amqp.connect(CLOUDAMQP_URL, (err, conn) => {
    if (err) throw err;

    conn.createChannel((err, ch) => {
      if (err) throw err;
      const queue = 'matching_queue';
      ch.assertQueue(queue, { durable: false });

      console.log('Listening for messages in RabbitMQ queue...');
      ch.consume(queue, async (msg) => {
        const userRequest = JSON.parse(msg.content.toString());
        console.log('Received user request:', userRequest);

        // Check if there's a matching user in unmatchedUsers
        const match = unmatchedUsers.find(u => checkSubset(u.category, userRequest.category) || checkSubset(userRequest.category, u.category)) || unmatchedUsers.find(u => u.difficulty === userRequest.difficulty);

        if (match) {
          try {
            console.log(`Matched user ${userRequest.userId} with user ${match.userId}`);

            // Create room in collaboration service
            const response = await axios.post(`${COLLAB_SERVICE_URL}/rooms/create`, {
              users: [userRequest.userId, match.userId],
              difficulty: userRequest.difficulty,
              category: userRequest.category
            });

            const { roomId } = response.data;

            // Notify both users
            [userRequest, match].forEach(user => {
              sendWsMessage(user.userId, {
                status: 'MATCH_FOUND',
                roomId,
                matchedUserId: user === userRequest ? match.userId : userRequest.userId,
                difficulty: userRequest.difficulty,
                category: userRequest.category
              });
            });

            // Clear the timeouts for both users
            clearTimeout(match.timeoutId);

            // Remove matched user from unmatchedUsers
            unmatchedUsers = unmatchedUsers.filter(u => u.userId !== match.userId);
          } catch (error) {
            console.error('Error creating room:', error);
            // Handle error appropriately
          }
        } else {
          // Set a timeout to remove unmatched users after 30 seconds
          const timeoutId = setTimeout(() => {
            unmatchedUsers = unmatchedUsers.filter(u => u.userId !== userRequest.userId);
            sendWsMessage(userRequest.userId, { status: 'timeout' });
          }, 30000);  // 30 seconds timeout

          // Add the new user with their timeout ID
          unmatchedUsers.push({ ...userRequest, timeoutId });
        }

        ch.ack(msg);  // Acknowledge message processing
      });
    });
  });
};

module.exports = { setupConsumer };
