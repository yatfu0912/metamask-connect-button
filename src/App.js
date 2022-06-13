import React from "react";
import "App.css";
//Import Components
import {useState} from "react";


function App(){

  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [chainID,setChainID] = useState(0);

  async function requestAccount() {
    if(window.ethereum) {
      console.log("detected metamask")

      try{
        //get the account address
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",});
        setWalletAddress(accounts[0]);

        //get the account balance
        const balanceHex = await window.ethereum.request({ 
          method: "eth_getBalance", 
          params: [accounts[0], "latest"] });
        
        const balance = parseInt(balanceHex,16) / 1000000000000000000;
          setWalletBalance(balance);

        //get chainID
        const chainID = await window.ethereum.request({ 
          method: "eth_chainId",
          params: [] });

          setChainID(chainID);

      } catch(error){
        console.log(error);
      }

    }
    else{
      console.log("no metamask detected")
  }
}

  return(
    <div className="App">
      <header className="App-header">
        <center>
        <button role="button" onClick={requestAccount}>Connect Wallet</button>
        <h3>Wallet Address: {walletAddress} </h3>
        <h3>Amount of Ether Token: {walletBalance} Ether</h3>
        <h3>ChainID: {chainID}</h3>
        </center>
      </header>
    </div>
  )
}


export default App;
