import React, { useEffect, useState } from "react";
import "./Chat.css";
import { createUsername } from "../../handlers/handlers";

interface ChatInterface {
  userBtcAddress: string;
  username: string;
}

export default function Chat({ username, userBtcAddress }: ChatInterface) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<Array<string>>([]);

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

  function handleMessage(e: MessageEvent<any>) {
    setChatLog((chatLog) => [...chatLog, e.data]);
  }

  function isSocketOpen(ws: WebSocket) {
    return ws.readyState === ws.OPEN;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function sendMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (message === "") return;
    if (socket === null) return;
    const currentTime = new Date();
    if (!isSocketOpen(socket)) return;
    try {
      socket.send(
        `${currentTime.getHours().toString()}:${currentTime
          .getMinutes()
          .toString()}:${
          currentTime.getSeconds().toString().length === 1
            ? "0" + currentTime.getSeconds().toString()
            : currentTime.getSeconds().toString()
        }  ${userBtcAddress.substring(0, 3)}...: ${message}`
      );
    } catch (err) {
      console.log(err);
      return;
    }
    setMessage("");
  }

  switch (username) {
    case "":
      if (userBtcAddress === "") {
        return <div className="Chat">Please connect your wallet!</div>;
      }
      return (
        <div className="Chat">
          <p>Please create a Username</p>
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
                e.preventDefault();
                if (message.length > 12) {
                  window.alert("Username must be less than 12 characters");
                  return;
                }
                createUsername(message, userBtcAddress);
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
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </form>
        </div>
      );
  }
}
