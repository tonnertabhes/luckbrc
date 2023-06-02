import React, { useEffect, useState } from "react";
import "./Chat.css";
import { createUsername } from "../../handlers/handlers";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdWallet } from "react-icons/io";
import UserInfo from "../../modals/UserInfo/UserInfo";

interface ChatInterface {
  userBtcAddress: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function Chat({
  username,
  userBtcAddress,
  setUsername,
}: ChatInterface) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<Array<string>>([]);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    if (socket === null) {
      setSocket(new WebSocket("ws://localhost:8080/ws"));
    }

    // return () => {
    //   if (!socket) return;
    //   socket.close();
    // };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.addEventListener("message", handleMessage);
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    if (username === "") return;
    socket.send(`${username} has entered the chat!`);
  }, [socket, username]);

  function handleMessage(e: MessageEvent<any>) {
    setChatLog((chatLog) => [...chatLog, e.data]);
  }

  function isSocketOpen(ws: WebSocket) {
    return ws.readyState === ws.OPEN;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function sendMessage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    msg: string
  ) {
    e.preventDefault();
    if (message === "") return;
    if (socket === null) return;
    const currentTime = new Date();
    if (!isSocketOpen(socket)) return;
    try {
      socket.send(msg);
    } catch (err) {
      console.log(err);
      return;
    }
    setMessage("");
  }

  function handleUsernameCreation(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (message.length > 12) {
      window.alert("Username must be less than 12 characters");
      return;
    }
    createUsername(message, userBtcAddress);
    setUsername(message);
    setMessage("");
  }

  function chatHeader() {
    return (
      <header className="chatHeader">
        <p className="headerText">Chat</p>
        <BsFillPersonFill
          className="chatHeaderIcon"
          size={20}
          onClick={() => setShowUserInfo(!showUserInfo)}
        />
        {showUserInfo ? (
          <UserInfo
            userBtcAddress={userBtcAddress}
            username={username}
            setUsername={setUsername}
            socket={socket}
            setShowUserInfo={setShowUserInfo}
          />
        ) : (
          <></>
        )}
      </header>
    );
  }

  switch (username) {
    case "":
      if (userBtcAddress === "") {
        return (
          <div className="Chat">
            {chatHeader()}
            <div className="chatBody">
              <IoMdWallet className="chatWalletIcon" size={120} />
              <p className="chatWarningText">Please connect your wallet!</p>
            </div>
          </div>
        );
      }
      return (
        <div className="Chat">
          {chatHeader()}
          <p className="chatWarningText">Please create a Username</p>
          <form>
            <input
              className="chatInput"
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter Username (max 12 characters)"
              type="text"
              value={message}
            />
            <button
              className="sendButton"
              type="submit"
              onClick={(e) => {
                handleUsernameCreation(e);
              }}
            >
              Send
            </button>
          </form>
        </div>
      );
    default:
      return (
        <div className="Chat">
          {chatHeader()}
          <div className="chatLog">
            {chatLog
              .slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <div className="messageText" key={index}>
                    {item}
                  </div>
                );
              })}
          </div>
          <form>
            <input
              className="chatInput"
              onChange={(e) => handleInputChange(e)}
              placeholder="Be Kind."
              type="text"
              value={message}
            />
            <button
              className="sendButton"
              type="submit"
              onClick={(e) => sendMessage(e, `${username}: ${message}`)}
            >
              Send
            </button>
          </form>
        </div>
      );
  }
}
