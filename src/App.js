  import { useState } from 'react';
  import{ethers}from 'ethers';
  import"./App.css";
  import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
  const greeterAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";

  function App() {
    const[message,Setmessage]=useState("");
    const [currentGreeting, setCurrentGreeting] = useState("");


    //smart contract intrection;
    //  request access user to meta mask account;  
    async function requestAccount(){
      await window.ethereum.request({method:'eth_requestAccounts'}); 
    }
    //fetch the current value store in greeting   
    async function fetchGreeting(){
      // if metamask exist
      if( typeof window.ethereum !="undefined"){
        const provider=new ethers.providers.Web3Provider(window.ethereum);
        // declear a contract
        const contract= new ethers.Contract(greeterAddress,Greeter.abi,provider);
        try {
          // get valued stored in contract
          const data =await contract.greet();
          console.log("data: ", data);
         await setCurrentGreeting(data);
          
        } catch (error) {
          console.log("error",error);
          
        }
      }
    }

    // fetch the current value store in greeting 
   
     async function setGreeting(){
       if(!message) return;
       if(typeof window.ethereum !=='undefined'){
         const provider=new ethers.providers.Web3Provider(window.ethereum);
         const signer=await provider.getSigner();
        //  create contract with signer
        const  contract=new ethers.Contract(greeterAddress,Greeter.abi,signer);
        const transaction=await contract.setGreeting(message);
        Setmessage("");
        console.log("transaction",transaction);
        await transaction.wait();
        fetchGreeting();
         
       }

     }
    

    return (
      <div className="App">
        <div className='App-header'>
        <div className='description'>
              <h1>Greeter</h1>
              <h3>fullstack dapp using hardhat and reactjs</h3>
            </div>
          <div className='custom-buttons'>
           

          <button onClick={fetchGreeting} style={{backgroundColor:"green",cursor: "pointer"}}>fetch Greeting</button>
        <button onClick={setGreeting} style={{backgroundColor:"red",cursor: "pointer"}} >Set Greeting</button>

          </div>
        
        <input placeholder='set greeting message' onChange={(e)=>Setmessage(e.target.value)} value={message}></input>
        <h2 className="greeting">Greeting: {currentGreeting}</h2>
        </div>
        
      </div>
    );
  }

  export default App;
