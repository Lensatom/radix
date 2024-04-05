import { Button, Text } from "@/components/base"
import { Avatar, AvatarFallback, AvatarImage, Container } from "@/components/inc"
import { NavLink } from "react-router-dom"
import LogoutIcon from "@/assets/icons/logout.svg"

const Profile = () => {
  const logout = () => {

  }

  return (
    <Container className="flex flex-col justify-center items-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>me</AvatarFallback>
      </Avatar>
      <div className="flex items-end gap-1">
        <Text variant="lg">Your Account</Text>
        <Button title="Logout" variant="ghost" onClick={logout} className="w-6 h-6 rounded-full !p-0">
          <img src={LogoutIcon} width="10" />
        </Button>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <Button pill variant="outline" asChild>
          <NavLink to="donations">View Donations</NavLink>
        </Button>
        <Button asChild>
          <NavLink to="create-donation">Create Donation</NavLink>
        </Button>
      </div>
    </Container>
  )
}

export default Profile