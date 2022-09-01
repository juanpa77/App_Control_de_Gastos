import { Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/useAuth"
import Login from "../views/login"

const ProtectedRoute = () => {
  const login = useAppSelector((user) => user)
  return !login.user.userToken
    ? <Login />
    : <Outlet />
}

export default ProtectedRoute