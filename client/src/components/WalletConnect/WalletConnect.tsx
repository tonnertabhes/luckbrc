import React, { useEffect, useState } from "react";
import "./WalletConnect.css";
import { getUsername } from "../../handlers/handlers";

declare global {
  interface Window {
    unisat: any;
  }
}

interface WalletConnect {
  userBtcAddress: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserBtcAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function WalletConnect({
  username,
  setUsername,
  userBtcAddress,
  setUserBtcAddress,
}: WalletConnect) {
  // This gets the username
  useEffect(() => {
    if (userBtcAddress === "") return;
    interface result {
      message: string;
      username: string;
    }
    getUsername(userBtcAddress).then((result: result) => {
      if (!result.username) {
        setUsername("");
        return;
      }
      setUsername(result.username);
    });
  }, [userBtcAddress]);

  async function unisatConnect() {
    if (typeof window.unisat === "undefined") {
      window.alert("Please Install Unisat Wallet!");
      window.open("http://unisat.io");
      return;
    }
    if (userBtcAddress !== "") {
      setUserBtcAddress("");
      setUsername("");
      return;
    }
    try {
      let accounts = await window.unisat.requestAccounts();
      setUserBtcAddress(accounts[0]);
      localStorage.setItem("BTC_ADDRESS", accounts[0]);
    } catch (error) {
      console.log("Unisat Connection Failed");
      console.log(error);
    }
  }

  return (
    <div className="WalletConnect" onClick={() => unisatConnect()}>
      {userBtcAddress === ""
        ? "CONNECT WALLET"
        : userBtcAddress.substring(0, 3) +
          "..." +
          userBtcAddress.substring(
            userBtcAddress.length,
            userBtcAddress.length - 3
          )}
    </div>
  );
}
