import React, { useState, useEffect, useContext } from "react";
import { moon, user } from "../../assets/icons/IconHeader";
import { getUserByEmail } from '../../api/UserApi';
import { UserContext } from '../../App';

const Header = () => {
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    // Check if userEmail is available from context or localStorage
    const storedEmail = userEmail || localStorage.getItem('userEmail');
    
    async function fetchUser() {
      if (storedEmail) {
        try {
          // Fetch user details from the backend using the email
          const userData = await getUserByEmail(storedEmail);
          setCurrentUserInfo(userData.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    }

    fetchUser();
  }, [userEmail]);

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#ffffff]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            Hi { currentUserInfo.username || 'Guest' }!
          </span>
          &nbsp;Welcome to PeerPrep
        </h1>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <div className="flex gap-4 items-center">
          <button className="h-[40px] w-[40px] text-pink-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {moon}
          </button>

          <button className="h-[40px] w-[40px] text-pink-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {user}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
