import React, { useState, useEffect, useContext, useCallback } from 'react';
import MatchForm from '../../components/student/MatchForm';
import { getMatch } from '../../api/MatchingApi';
import { getUserByEmail } from '../../api/UserApi';
import { UserContext } from '../../App';

const timeout = 30;  // Timeout value in seconds

const MatchingPage = () => {
  const [status, setStatus] = useState('');
  const [ws, setWs] = useState(null);
  const [countdown, setCountdown] = useState(timeout);
  const [isMatching, setIsMatching] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    async function fetchUser() {
      if (userEmail) {
        setIsLoading(true);
        try {
          const userData = await getUserByEmail(userEmail);
          setCurrentUserInfo(userData.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setStatus("Error loading user data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchUser();
  }, [userEmail]);

  const handleMatchRequest = useCallback(async (submission) => {
    if (!currentUserInfo || !currentUserInfo.id) {
      setStatus('User information not loaded. Please try again.');
      return;
    }

    setStatus('Finding a match...');
    setCountdown(timeout);
    setIsMatching(true);

    try {
      const data = {
        userId: currentUserInfo.id,
        category: submission.category,
        difficulty: submission.difficulty
      }

      const res = await getMatch(data);

      const websocket = new WebSocket('ws://localhost:8002');
      websocket.onopen = () => {
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
        setWs(null);
      };

      setWs(websocket);
    } catch (err) {
      setStatus('Error sending request. Please try again.');
      setIsMatching(false);
    }
  }, [currentUserInfo]);

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

  useEffect(() => {
    return () => {
      if (ws) ws.close();
    };
  }, [ws]);

  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="Matching">
      <h1>Wanna practice coding with your peer?</h1>
      <MatchForm onSubmit={handleMatchRequest} />
      <p>{status}</p>
      {isMatching && <p>Time remaining: {countdown} seconds</p>}
    </div>
  );
}

export default MatchingPage;