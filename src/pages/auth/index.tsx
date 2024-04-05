import MetamaskIcon from "@/assets/icons/metamask.svg"
import { Button, Text } from "@/components/base"
import { Container } from "@/components/inc"
import { isSuccesscode } from "@/lib/utils"
import { POST } from "@/services/api"
import { UserContext } from "@/store/contexts"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext)

  useEffect(() => {
    if (userData) navigate("/")
  }, [])

  const authenticate = () => {
    if (window.ethereum) {
      window.ethereum.request({method: "eth_requestAccounts"}).then((res:any) => {
        accountChangeHandler(res[0])
      }).catch((err) => console.log(err))
    } else {
      console.log("Hi")
    }
  }

  const accountChangeHandler = async (account:any) => {
    const message = "Radix Authentication"
    if (window.ethereum) {
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, account]
      })
      const data = {
        message,
        signature,
        address: account
      }
      const res:any = await POST("/auth/verify-wallet", data)
      if (isSuccesscode(res.status)) {
        localStorage.setItem("accessToken", res.data.token.token)
        setUserData(res.data.token.user)
        navigate("/profile")
      }
    }
  }

  return (
    <Container className="flex flex-col gap-8 justify-center items-center">
      <Text variant="xl" className="text-primary-dark">Log in</Text>
      <Button onClick={authenticate} size="lg" className="flex items-center gap-4 rounded-full">
        <img width={25} src={MetamaskIcon} alt="meta-mask-icon" />
        <Text>Continue with Metamask</Text>
      </Button>
      <Text variant="sm" className="w-1/3 text-center">By clicking continue with Metamask above, you acknowledge you have read and understood and agreed to Radix's Terms and condition and privacy policy</Text>
    </Container>
  )
}

export default Auth