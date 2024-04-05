import React from 'react'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import FundMeABI from '../contracts/FundMeABI.json'; // The ABI for your contract

const useFundMeContract = () => {
  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract's address

  export const useFundMeContract = () => {
    const [contract, setContract] = useState<ethers.Contract>();
    
    useEffect(() => {
      if (window.ethereum) {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const fundMeContract = new ethers.Contract(contractAddress, FundMeABI, signer);
        
        setContract(fundMeContract);
      } else {
        console.error('Ethereum object not found, install MetaMask.');
      }
    }, []);

}

export default useFundMeContract