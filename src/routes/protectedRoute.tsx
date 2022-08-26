import { Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/useAuth"
import Login from "../views/login"

const ProtectedRoute = () => {
  const login = useAppSelector((user) => user)

  if (!login.user.userToken) {
    return (
      <Login />
    )
  }
  return <Outlet />
}

export default ProtectedRoute