import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./UserInfo.css";
import { BsFillPersonFill } from "react-icons/bs";
import { changeUsername } from "../../handlers/handlers";

interface UserInfo {
  setShowUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  socket: WebSocket | null;
  userBtcAddress: string;
}

export default function UserInfo({
  setShowUserInfo,
  setUsername,
  username,
  socket,
  userBtcAddress,
}: UserInfo) {
  const [newUsername, setNewUsername] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUsername(e.target.value);
  }

  function handleUsernameChange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (socket === null) return;
    if (newUsername === "") {
      window.alert("Username cannot be blank");
      return;
    }
    if (newUsername.length > 12) {
      window.alert("Username must be less than 12 characters");
      return;
    }
    changeUsername(newUsername, userBtcAddress);
    socket.send(`${username} is now ${newUsername}`);
    try {
      setUsername(newUsername);
    } catch (err) {
      window.alert(err);
    }
    setShowUserInfo(false);
  }

  return (
    <div className="UserInfo">
      <div className="userInfoModal">
        <AiFillCloseCircle
          onClick={() => setShowUserInfo(false)}
          className="closeUserInfoBtn"
        />
        <BsFillPersonFill size={50} />
        <h3>Username: {username}</h3>
        <form>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="New Username"
          />
          <button type="submit" onClick={(e) => handleUsernameChange(e)}>
            Change Name
          </button>
        </form>
      </div>
    </div>
  );
}
