const amqp = require('amqplib/callback_api');
const { sendWsMessage } = require('./ws');
const dotenv = require('dotenv');
dotenv.config();

const CLOUDAMQP_URL = process.env.CLOUDAMQP_URL;

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
      ch.consume(queue, (msg) => {
        const userRequest = JSON.parse(msg.content.toString());
        console.log('Received user request:', userRequest);

        // Check if there's a matching user in unmatchedUsers
        const match = unmatchedUsers.find(u => checkSubset(u.category, userRequest.category) || checkSubset(userRequest.category, u.category)) || unmatchedUsers.find(u => u.difficulty === userRequest.difficulty);

        if (match) {
          console.log(`Matched user ${userRequest.userId} with user ${match.userId}`);

          // Notify both users via ws
          sendWsMessage(match.userId, { status: 'matched', matchedUserId: userRequest.userId });
          sendWsMessage(userRequest.userId, { status: 'matched', matchedUserId: match.userId });

          // Clear the timeouts for both users
          clearTimeout(match.timeoutId);

          // Remove the matched user from unmatchedUsers
          unmatchedUsers = unmatchedUsers.filter(u => u.userId !== match.userId);
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
