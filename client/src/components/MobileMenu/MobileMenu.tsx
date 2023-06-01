import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavbarData } from "../Navbar/NavbarData";
import "./MobileMenu.css";
import WalletConnect from "../WalletConnect/WalletConnect";

interface MobileMenu {
  menuActive: boolean;
  userBtcAddress: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserBtcAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function MobileMenu({
  username,
  setUsername,
  menuActive,
  userBtcAddress,
  setUserBtcAddress,
}: MobileMenu) {
  return (
    <div className={menuActive ? "MobileMenu active" : "MobileMenu"}>
      <WalletConnect
        username={username}
        setUsername={setUsername}
        userBtcAddress={userBtcAddress}
        setUserBtcAddress={setUserBtcAddress}
      />
      {NavbarData.map((item, index) => {
        return (
          <a
            className="navbar-links"
            target="_blank"
            href={item.path}
            key={index}
          >
            <li className={item.cName + " mobile"} key={index}>
              {item.name}
            </li>
          </a>
        );
      })}
    </div>
  );
}
