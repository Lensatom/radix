import { Button, Input, Text } from "@/components/base"
import { Container } from "@/components/inc"
import ProgressBar from "@/components/inc/progressBar"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const CopyLink = () => {
  const location = useLocation()
  const { id } = location.state
  const link = `https://radix-olive.vercel.app/donations/${id}`
  const [copied, setCopied] = useState(false)

  const copy = () => {
    setTimeout(() => {
      navigator.clipboard.writeText(link)
      setCopied(true)
    }, 200)
  }

  return (
    <Container className="relative flex items-center justify-end">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-primary-light rounded-r-3xl flex items-center p-14">
        <Text variant="lg">You're now all set!</Text>
      </div>
      <div className="w-1/2 h-full p-24 flex flex-col justify-between">
        <ProgressBar gotten={2} all={2} />
        <div className="flex flex-col gap-10">
          <Text variant="lg" className="text-center">Copy your unique link</Text>
          <Text>Please note your unique code is peculiar to you and your donations will be used to receive payments from donors.</Text>
          <div className="flex flex-col">
            <Input value={link} className="rounded-full" />
            <Button onClick={copy} size="lg" className="rounded-full mt-5">{copied ? "Link copied!" : "Copy"}</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CopyLink