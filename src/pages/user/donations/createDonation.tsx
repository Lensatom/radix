import { Button, Input, Text } from "@/components/base"
import { Container } from "@/components/inc"
import ProgressBar from "@/components/inc/progressBar"
import useForm from "@/hooks/useForm"
import { isSuccesscode } from "@/lib/utils"
import { POST } from "@/services/api"
import { useNavigate } from "react-router-dom"

const CreateDonation = () => {
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    description: "",
    target: undefined
  }
  const { cred, changeCred, changeError, isLoading, setIsLoading } = useForm(initialValues)

  const submit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    const res:any  = await POST("/donations/create", cred)
    if (isSuccesscode(res.status)) {
      navigate("../copy-donation-link", {state: res.data.donation})
    } else {
      changeError("general", "An error occured")
    }
    setIsLoading(false)
  }

  return (
    <Container className="relative !bg-primary-light flex items-center justify-start">
      <div className="w-1/3 pl-8">
        <Text variant="lg">Let's create your donation</Text>
        <Text className="mt-2">This information helps us to know you and understand your donation needs.</Text>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-l-3xl z-50 px-24 py-16 flex flex-col justify-between">
        <div className="flex flex-col items-end gap-1">
          <Text variant="sm" className="font-bold px-2">Step 1 of 2</Text>
          <ProgressBar gotten={1} all={2} />
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 mt-2">
          <Input label="Title" value={cred.name} onChange={(e:any) => changeCred("name", e.target.value)} placeholder="Enter your donation title" />
          <Input label="Details" value={cred.description} onChange={(e:any) => changeCred("description", e.target.value)} type="textarea" placeholder="Tell us more about your donation" />
          <Input label="Target" value={cred.target} onChange={(e:any) => changeCred("target", parseInt(e.target.value))} type="number" placeholder="How much do you intend to raise?" />
          <Button type="submit" isLoading={isLoading} size="lg" className="rounded-full mt-5">Create Donation</Button>
        </form>
      </div>
    </Container>
  )
}

export default CreateDonation