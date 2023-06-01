import React from "react";
import { RiGameFill } from "react-icons/ri";
import "./Games.css";

export default function Games() {
  return (
    <div className="Games">
      <header className="gamesHeader">
        <p className="headerText">Games</p>
      </header>
      <div className="gamesBody">
        <RiGameFill className="gamesIcon" size={110} />
        <p className="gamesText">Coming Soon.</p>
      </div>
    </div>
  );
}
