import React from "react";
import "./Chat.css";

interface Chat {
  userBtcAddress: string;
}

export default function Chat({ userBtcAddress }: Chat) {
  return (
    <div className="Chat">
      {userBtcAddress === "" ? "Connect Wallet to Chat" : "CHAT"}
    </div>
  );
}
