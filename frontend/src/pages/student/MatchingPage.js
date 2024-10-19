import React, { useState, useEffect, useContext } from 'react';
import MatchForm from '../../components/student/MatchForm';
import { getMatch } from '../../api/MatchingApi';
import { getUserByEmail } from '../../api/UserApi';
import { UserContext } from '../../App';

const timeout = 30;  // Timeout value in seconds

const MatchingPage = () => {
  const [status, setStatus] = useState('');
  const [ws, setWs] = useState(null);  // WebSocket connection
  const [countdown, setCountdown] = useState(timeout);  // Timer state (30 seconds)
  const [isMatching, setIsMatching] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    async function fetchUser() {
      if (userEmail) {
        // Fetch user details from the backend
        // eslint-disable-next-line no-unused-vars
        const userData = await getUserByEmail(userEmail);
        setCurrentUserInfo(userData.data);
      }
    }

    fetchUser();
  }, [userEmail]);

  // Handle match request submission
  const handleMatchRequest = async (submission) => {
    setStatus('Finding a match...');
    setCountdown(timeout);  // Reset the countdown to 30 seconds

    setIsMatching(true);

    // Send the match request to the backend via POST
    try {
      const data = {
        userId: currentUserInfo.id,
        category: submission.category,
        difficulty: submission.difficulty
      }

      const res = await getMatch(data);

      // Open WebSocket connection for real-time updates
      const websocket = new WebSocket('ws://localhost:8002');
      websocket.onopen = () => {
        // Send userId to the WebSocket server to track the connection
        websocket.send(JSON.stringify({ userId: res.userId }));
      };

      websocket.onmessage = (message) => {
        const result = JSON.parse(message.data);
        if (result.status === 'matched') {
          setStatus(`Match found! You are paired with user ${result.matchedUserId}`);
        } else if (result.status === 'timeout') {
          setStatus('No match found. Please try again.');
        }
        setIsMatching(false);
      };

      websocket.onerror = (error) => {
        setStatus('Error occurred. Please try again.');
        setIsMatching(false);
      };

      websocket.onclose = () => {
        setWs(null);  // Clean up WebSocket connection
      };

      setWs(websocket);  // Store WebSocket instance
    } catch (err) {
      setStatus('Error sending request. Please try again.');
      setIsMatching(false);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isMatching) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(intervalId);
            setIsMatching(false);
            setStatus('No match found. Please try again.');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isMatching]);

  // Clean up the WebSocket and countdown interval when the component unmounts
  useEffect(() => {
    return () => {
      if (ws) ws.close();
    };
  }, [ws]);

  return (
    <div className="Matching">
      <h1>Wanna practice coding with your peer?</h1>
      <MatchForm onSubmit={handleMatchRequest} />
      <p>{status}</p>
      {/* {status === 'Finding a match...' && <p>Time remaining: {countdown} seconds</p>} */}
      {isMatching && <p>Time remaining: {countdown} seconds</p>}
    </div>
  );
}

export default MatchingPage;
