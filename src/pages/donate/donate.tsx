import DonateIcon from "@/assets/icons/donate.svg";
import GraphIcon from "@/assets/icons/graph.svg";
import { Button, Text } from "@/components/base";
import { Container, Loader, ProgressBar } from "@/components/inc";
import DonateCard from "@/components/inc/donateCard";
import { imageBoxStyle, isSuccesscode } from "@/lib/utils";
import { GET, POST } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Donate = () => {
  const { id } = useParams()
  const [modalOpened, setModalOpened] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)




  // @ts-ignore: Providers is available
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const { data:imageURL } = useQuery({
    queryKey: [`images-${id}`],
    queryFn: async () => {
      const res = await axios.get(`https://pixabay.com/api/?key=43236040-3a44a44b7c1565c5f7a043102&q=${Math. floor((Math. random() * 1000000) + 1)}&image_type=photo`)
      if (isSuccesscode(res.status)) {
        const url = res.data.hits[0].largeImageURL
        return url
      } else {
        return ""
      }
    }
  })

  const { data:donation, isLoading } = useQuery({
    queryKey :[`donation-${id}`],
    queryFn: async () => {
      const res:any = await GET(`/donations/${id}`)
      if (isSuccesscode(res.status)) return res.data.donation
      else return null
    }
  })

  const { data:donors, isLoading:isLoadingDonors } = useQuery({
    queryKey :["donators"],
    queryFn: async () => {
      const res:any = await GET(`/donations/donors/${id}`)
      if (isSuccesscode(res.status)) return res.data.donors
      else return null
    }
  })

  const { data:suggestions, isLoading:isSuggestionsLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res:any = await GET("/donations")
      console.log(res)
      if (isSuccesscode(res.status)) return res.data.donations
      else return null
    }
  })

  const closeModal = () => {
    setModalOpened(false)
  }





  const handleTransfer = async () => {
    try {
      // Ensure that the address and amount are valid
      if (!ethers.utils.isAddress(toAddress)) {
        setMessage('Invalid address');
        return;
      }

      if (isNaN(parseFloat(amount))) {
        setMessage('Invalid amount');
        return;
      }

      // Convert the amount to Wei (the smallest unit of Ether)
      const weiAmount = ethers.utils.parseEther(amount);

      // Send transaction to the smart contract
      const tx = await contract.receiveEther({
          value: weiAmount
      });

      await tx.wait(); // Wait for transaction to be mined

        setMessage('Transaction successful');
    } catch (error) {
        setMessage('Transaction failed: ' + error.message);
    }
  };





  // const sendTransaction = async () => {
  //   closeModal()
  //   if (!window.ethereum) {
  //     console.log('MetaMask is not installed');
  //     return;
  //   }

  //   try {
  //     const accounts:any = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
  //     const account = accounts[0];

  //     const transactionParameters = {
  //       nonce: '0x00', // ignored by MetaMask
  //       to: donation.wallet, // Required except during contract publications.
  //       from: account, // must match user's active address.
  //       value: '0x29a2241af62c0000', // hex value of the amount of wei to send
  //       gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  //       gas: '0x2710', // customizable by user during MetaMask confirmation.
  //     };

  //     const txHash:any = await window.ethereum.request({
  //       method: 'eth_sendTransaction',
  //       params: [transactionParameters],
  //     });
  //     await POST("/donations/track", {
  //       transactionHash: txHash,
  //       donationId: donation.id
  //     })
  //   } catch (error) {
  //     console.error('Error sending transaction:', error);
  //   }
  // }

  const copyLink = () => {
    const link = "hello"
    setTimeout(() => {
      navigator.clipboard.writeText(link)
      setLinkCopied(true)
    }, 200)
  }

  if (isLoading || isLoadingDonors) return (
    <div className="w-full h-screen">
      <Loader />
    </div>
  )
  if (donation === null) return "An error occured"
  return (
    <Container className="my-16 !h-fit grid grid-cols-12 gap-y-4 gap-x-10">
      <Text variant="lg" className="col-span-12">{donation.name}</Text>
      <div className="flex flex-col gap-5 col-span-7">
        <div style={imageBoxStyle(imageURL)} className="w-full h-80 rounded-md overflow-hidden" />
        <Text variant="md">{donation.description}</Text>
        <Button onClick={sendTransaction} className="rounded-full w-3/4">Donate Now</Button>
      </div>
      <div className="flex flex-col gap-4 col-span-5">
        <div className="flex items-center gap-2">
          <Text variant="lg" className="font-semibold text-primary-dark">${donation.raised || 0}</Text>
          <Text variant="md" className="font-thin">USD raised out of ${donation.target}</Text>
        </div>
        <ProgressBar gotten={donation.raised || 0} all={donation.target} />
        <Text variant="sm">{donors.noOfDonations} donations</Text>
        <Button onClick={copyLink} variant="outline" className="rounded-full">{linkCopied ? "Link copied!" : "Copy link"}</Button>
        <Button onClick={sendTransaction} size="lg" className="rounded-full">Donate Now</Button>
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <Button className="rounded-full w-12 h-12 p-0">
              <img src={GraphIcon} width={20} />
            </Button>
            <Text>{donors.noOfDonations} people already donated</Text>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {donors.donors.map((donor:any, index:number) => (
              <DonationCard key={index} amount={donor.amount} />
            ))}
          </div>
        </div>
        <Button onClick={() => setModalOpened(true)} variant="outline" className="rounded-full mt-5">See All</Button>
      </div>
      <div className="col-span-12 mt-10 h-[50vh]">
        <Text variant="md" className="font-bold text-lg">
          More ways to make impact. Find<br />
          donations inspired by what you care about
        </Text>
        <div className="grid grid-cols-4 h-full mt-5 gap-4">
          {!isSuggestionsLoading &&
          suggestions.map((suggestion:any) => (
            <DonateCard key={suggestion.id} {...suggestion} />
          ))}
        </div>
      </div>
      {modalOpened && <DonationsModal donors={donors} closeModal={closeModal} connect={sendTransaction} />}
      {/* <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
          {chainId && `Connected chain: ${chainId}`}
          <p></p>
          {account && `Connected account: ${account}`}
          </>
        </div>
      )} */}
    </Container>
  );
}

const DonationsModal = ({donors, closeModal, connect}:{donors:any, closeModal:any, connect:any}) => {
  return (
    <div onClick={closeModal} className="w-full h-screen fixed top-0 left-0 bg-black/20 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-1/3 h-2/3 py-2 px-10 rounded-lg flex flex-col items-center shadow-xl">
        <Text variant="lg">Donations ({donors.noOfDonations})</Text>
        <div className="h-full w-full overflow-y-scroll scrollbar-hide">
          <div className="w-full grid grid-cols-2 gap-4 items-start mt-5">
            {donors.donors.map((donator:any, index:number) => (
              <DonationCard key={index} {...donator} />
            ))}
          </div>
        </div>
        <Button onClick={connect} className="mt-2">Donate Now</Button>
      </div>
    </div>
  )
}

const DonationCard = ({amount}:{amount:number}) => {
  return (
    <div className="flex items-center gap-3">
      <Button className="rounded-full w-12 h-12 p-0">
        <img src={DonateIcon} width={20} />
      </Button>
      <div className="flex flex-col gap-0.5">
        <Text variant="sm">Anonymous</Text>
        <Text variant="sm" className="font-semibold">${amount}</Text>
      </div>
    </div>
  )
}

export default Donate
