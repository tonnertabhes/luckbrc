import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavbarData } from "../Navbar/NavbarData";
import "./MobileMenu.css";
import WalletConnect from "../WalletConnect/WalletConnect";

interface MobileMenu {
  menuActive: boolean;
  userBtcAddress: string;
  setUserBtcAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function MobileMenu({
  menuActive,
  userBtcAddress,
  setUserBtcAddress,
}: MobileMenu) {
  return (
    <div className={menuActive ? "MobileMenu active" : "MobileMenu"}>
      <WalletConnect
        userBtcAddress={userBtcAddress}
        setUserBtcAddress={setUserBtcAddress}
      />
      {NavbarData.map((item, index) => {
        return (
          <a className="navbar-links" target="_blank" href={item.path}>
            <li className={item.cName + " mobile"} key={index}>
              {item.name}
            </li>
          </a>
        );
      })}
    </div>
  );
}
