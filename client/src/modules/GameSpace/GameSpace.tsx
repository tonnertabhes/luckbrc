import React from "react";
import { GiPokerHand } from "react-icons/gi";
import "./GameSpace.css";

export default function GameSpace() {
  return (
    <div className="GameSpace">
      <header className="gamespaceHeader">
        <p className="headerText">Game Space</p>
      </header>
      <div className="gameSpaceBody">
        <GiPokerHand className="gameSpaceIcon" size={120} />
        <p className="gameSpaceText">Coming Soon.</p>
      </div>
    </div>
  );
}
