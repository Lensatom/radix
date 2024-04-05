import LandingImage from "@/assets/images/landing.svg"
import { Button, Text } from "@/components/base"
import { Container, DonateCard, Loader } from "@/components/inc"
import { isSuccesscode } from "@/lib/utils"
import { GET } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { NavLink } from "react-router-dom"

const Home = () => {
  const { data:donations, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res:any = await GET("/donations")
      console.log(res)
      if (isSuccesscode(res.status)) return res.data.donations
      else return null
    }
  })

  if (isLoading) return <Loader />
  if (donations === null) return "An error occured"
  return (
    <>
    <Container className="relative !bg-primary-light flex flex-col justify-center items-center gap-6 overflow-hidden">
      <Text variant="xl" className="text-primary-dark text-center">
        Your Silent Sanctuary<br />
        Where Help Finds Its Voice
      </Text>
      <Button className="z-10" asChild>
        <NavLink to="donations">Donate</NavLink>
      </Button>
      <img src={LandingImage} width="60%" alt="people-holding-hands" className="absolute -bottom-5" />
    </Container>
    <Container className="py-10 !h-fit mb-10">
      <Text variant="lg" className="text-primary-dark text-center">Who to help</Text>
      <div className="grid grid-cols-12 grid-rows-1 h-[100vh] gap-5 mt-8">
        <DonateCard {...donations[0]} className="col-span-6 h-full" />
        <div className="grid grid-cols-2 col-span-6 gap-4">
          <DonateCard {...donations[1]} className="h-full" />
          <DonateCard {...donations[2]} className="h-full" />
          <DonateCard {...donations[3]} className="h-full" />
          <DonateCard {...donations[4]} className="h-full" />
        </div>
      </div>
    </Container>
    </>
  )
}

export default Home