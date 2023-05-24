import React, { useState } from "react";
import "./Navbar.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import { FaBars } from "react-icons/fa";
import { NavbarData } from "./NavbarData";
import LOGO from "../../assets/logo.png";
import WalletConnect from "../WalletConnect/WalletConnect";

interface Navbar {
  mobile: boolean;
  userBtcAddress: string;
  setUserBtcAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({
  mobile,
  userBtcAddress,
  setUserBtcAddress,
}: Navbar) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="Navbar">
      <img className="logo" src={LOGO} />
      <div className="logo-text">LUCKBRC</div>
      {mobile ? (
        <>
          <MobileMenu
            menuActive={menuActive}
            userBtcAddress={userBtcAddress}
            setUserBtcAddress={setUserBtcAddress}
          />
          <FaBars
            onClick={() => setMenuActive(!menuActive)}
            className="menu-bars"
            size="25"
            color="black"
          />
        </>
      ) : (
        <div className="desktop-nav">
          {NavbarData.map((item, index) => {
            return (
              <a target="_blanK" className="navbar-links" href={item.path}>
                <li className={item.cName} key={index}>
                  {item.name}
                </li>
              </a>
            );
          })}
          <WalletConnect
            userBtcAddress={userBtcAddress}
            setUserBtcAddress={setUserBtcAddress}
          />
        </div>
      )}
    </div>
  );
}
