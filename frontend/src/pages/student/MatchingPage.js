import React, { useState, useEffect, useContext, useCallback } from "react";
import MatchForm from "../../components/student/MatchForm";
import { getMatch } from "../../api/MatchingApi";
import { getUserByEmail } from "../../api/UserApi";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const timeout = 30; // Timeout value in seconds

const MatchingPage = () => {
  const [status, setStatus] = useState("");
  const [ws, setWs] = useState(null);
  const [countdown, setCountdown] = useState(timeout);
  const [isMatching, setIsMatching] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If userEmail exists, save it to localStorage for persistence across refreshes
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    // Check if userEmail is available from UserContext or localStorage
    const storedEmail = userEmail || localStorage.getItem("userEmail");

    if (storedEmail) {
      setIsLoading(true);
      setStatus(""); // Clear any previous status

      async function fetchUser() {
        try {
          const userData = await getUserByEmail(storedEmail);
          if (userData && userData.data) {
            setCurrentUserInfo(userData.data);
          } else {
            setStatus("User data not available. Please try again later.");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setStatus("Error loading user data. Please try again later.");
        } finally {
          setIsLoading(false); // Ensure loading stops even in case of an error
        }
      }

      fetchUser();
    } else {
      setStatus("No user email provided. Please log in.");
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleMatchRequest = useCallback(
    async (submission) => {
      if (!currentUserInfo || !currentUserInfo.id) {
        setStatus("User information not loaded. Please try again.");
        return;
      }

      setStatus("Finding a match...");
      setCountdown(timeout);
      setIsMatching(true);

      // Helper function to close WebSocket connection and wait until it's fully closed
      const closeWebSocket = () => {
        return new Promise((resolve) => {
          if (ws) {
            ws.onclose = () => {
              console.log("Previous WebSocket closed.");
              resolve(); // Resolve the promise once WebSocket is closed
            };
            ws.close(); // Initiate WebSocket close
          } else {
            resolve(); // If no WebSocket, resolve immediately
          }
        });
      };

      try {
        const data = {
          userId: currentUserInfo.id,
          category: submission.category,
          difficulty: submission.difficulty,
        };

        const res = await getMatch(data);

        // Close any existing WebSocket connection before creating a new one
        await closeWebSocket(); // Wait for WebSocket to close

        const websocket = new WebSocket("ws://localhost:8002");
        websocket.onopen = () => {
          websocket.send(JSON.stringify({ userId: res.userId }));
        };

        websocket.onmessage = (message) => {
          const result = JSON.parse(message.data);
          if (result.status === "MATCH_FOUND") {
            setStatus(
              `Match found! You are paired with user ${result.matchedUserId}`
            );
            // Navigate to collaboration room
            navigate(`/room/${result.roomId}`);
          } else if (result.status === "timeout") {
            setStatus("No match found. Please try again.");
          }
          setIsMatching(false);
        };

        websocket.onerror = (error) => {
          setStatus("Error occurred. Please try again.");
          setIsMatching(false);
        };

        websocket.onclose = () => {
          setWs(null);
        };

        setWs(websocket);
      } catch (err) {
        setStatus("Error sending request. Please try again.");
        setIsMatching(false);
      }
    },
    [currentUserInfo, ws]
  );

  useEffect(() => {
    let intervalId;
    if (isMatching) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(intervalId);
            setIsMatching(false);
            setStatus("No match found. Please try again.");
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
    <div className="Matching m-[1rem]">
      <h1>Wanna practice coding with your peer?</h1>
      <MatchForm onSubmit={handleMatchRequest} />
      <div className="flex items-center justify-center">
        <p>{status}</p>
        {isMatching && <p>Time remaining: {countdown} seconds</p>}
      </div>
    </div>
  );
};

export default MatchingPage;
