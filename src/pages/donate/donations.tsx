import { Container, DonateCard, Loader } from "@/components/inc"
import { isSuccesscode } from "@/lib/utils"
import { GET } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

const Donations = () => {
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
    <Container className="mt-16">
      <div className="grid grid-cols-4 gap-5">
        {donations.map((donation:any) => (
          <DonateCard key={donation.id} {...donation} />
        ))}
      </div>
    </Container>
  )
}

export default Donations