import React from "react";
import "./WalletConnect.css";

declare global {
  interface Window {
    unisat: any;
  }
}

interface WalletConnect {
  userBtcAddress: string;
  setUserBtcAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function WalletConnect({
  userBtcAddress,
  setUserBtcAddress,
}: WalletConnect) {
  async function unisatConnect() {
    if (typeof window.unisat === "undefined") {
      window.alert("Please Install Unisat Wallet!");
      window.open("http://unisat.io");
      return;
    }
    if (userBtcAddress !== "") {
      setUserBtcAddress("");
      return;
    }
    try {
      let accounts = await window.unisat.requestAccounts();
      setUserBtcAddress(accounts[0]);
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
