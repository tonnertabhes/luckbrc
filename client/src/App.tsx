import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Games from "./modules/Games/Games";
import GameSpace from "./modules/GameSpace/GameSpace";
import Chat from "./modules/Chat/Chat";

function App() {
  const [mobile, setMobile] = useState(false);
  const [userBtcAddress, setUserBtcAddress] = useState("");

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1100) {
        setMobile(true);
        return;
      }
      setMobile(false);
    }

    window.addEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div className="App">
      <Navbar
        userBtcAddress={userBtcAddress}
        setUserBtcAddress={setUserBtcAddress}
        mobile={mobile}
      />
      <div className="modules">
        <Games />
        <GameSpace />
        <Chat userBtcAddress={userBtcAddress} />
      </div>
    </div>
  );
}

export default App;