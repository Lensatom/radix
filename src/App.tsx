import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, Loader } from "./components/inc";
import { isSuccesscode } from "./lib/utils";
import Auth from "./pages/auth";
import { Donate, Donations as PublicDonations } from "./pages/donate";
import { Home } from "./pages/landing";
import { Profile } from "./pages/user";
import { CopyLink, CreateDonation, Donations } from "./pages/user/donations";
import { GET } from "./services/api";
import { UserContext } from "./store/contexts";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  
  const fetchData = async () => {
    const res:any = await GET("/user/me")
    if (isSuccesscode(res.status)) {
      setUserData(res.data.user)
    } else {
      setUserData(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return (
    <div className="w-full h-screen">
      <Loader />
    </div>
  )
  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <div>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="donations">
            <Route path="" element={<PublicDonations />} />
            <Route path=":id" element={<Donate />} />
          </Route>
          <Route path="profile">
            <Route path="" element={<Profile />} />
            <Route path="create-donation" element={<CreateDonation />} />
            <Route path="copy-donation-link" element={<CopyLink />} />
            <Route path="donations" element={<Donations />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App
