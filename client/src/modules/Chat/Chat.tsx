import React, { useEffect, useState } from "react";
import "./Chat.css";

interface Chat {
  userBtcAddress: string;
}

const socket = new WebSocket("ws://127.0.0.1:8080/ws");

export default function Chat({ userBtcAddress }: Chat) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<Array<string>>([]);

  useEffect(() => {
    if (!isSocketOpen(socket)) return;
    socket.onmessage = (e) => {
      setChatLog((chatLog) => [...chatLog, e.data]);
    };
  }, [socket]);

  function isSocketOpen(ws: WebSocket) {
    return ws.readyState === ws.OPEN;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function sendMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const currentTime = new Date();
    if (!isSocketOpen(socket)) return;
    try {
      socket.send(
        `${currentTime.getHours().toString()}:${currentTime
          .getMinutes()
          .toString()}:${currentTime
          .getSeconds()
          .toString()}  ${userBtcAddress.substring(0, 3)}...: ${message}`
      );
    } catch (err) {
      console.log(err);
      return;
    }
    setMessage("");
  }

  return (
    <div className="Chat">
      <div className="chatLog">
        {chatLog.map((item, index) => {
          return <div key={index}>{item}</div>;
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
