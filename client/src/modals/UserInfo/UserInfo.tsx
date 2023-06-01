import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./UserInfo.css";
import { BsFillPersonFill } from "react-icons/bs";

interface UserInfo {
  setShowUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}

export default function UserInfo({ setShowUserInfo, username }: UserInfo) {
  return (
    <div className="UserInfo">
      <div className="userInfoModal">
        {/* <AiFillCloseCircle
          onClick={() => setShowUserInfo(false)}
          className="closeUserInfoBtn"
        /> */}
        <BsFillPersonFill size={50} />
        <h3>Username: {username}</h3>
        <form>
          <input type="text" placeholder="New Username" />
          <button type="submit">Change Name</button>
        </form>
      </div>
    </div>
  );
}
