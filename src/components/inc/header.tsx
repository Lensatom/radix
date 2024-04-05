import { NavLink } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage, Container } from "."
import { Button, Text } from "../base"
import { useContext } from "react"
import { UserContext } from "@/store/contexts"

const Header = () => {
  const { userData } = useContext(UserContext)

  return (
    <Container className="absolute top-0 left-0 !bg-transparent !h-fit flex justify-between items-center z-40">
      <Text variant="md" className="font-bold text-primary-dark">RADIX</Text>
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <NavLink className="cursor-pointer" to="">Home</NavLink>
          </li>
          <li>
            <Button size="sm" className="rounded-full px-6" asChild>
              <NavLink className="cursor-pointer" to="/donations">Donate</NavLink>
            </Button>
          </li>
          <li>
            {userData ? (
              <NavLink to="/profile">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>me</AvatarFallback>
                </Avatar>
              </NavLink>
            ) : (
              <Button size="sm" className="rounded-full px-6" variant="outline" asChild>
                <NavLink className="cursor-pointer" to="auth">Sign in</NavLink>
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </Container>
  )
}

export default Header