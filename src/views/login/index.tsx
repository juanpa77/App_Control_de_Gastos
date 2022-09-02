import { NextOrObserver, User } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Base } from "../../components/buttons/styled"
import { setActiveUser } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/useAuth"
import { observerAuth, signWithGoogle } from "../../services/authProvider"
import { Wrapper } from "./styled"

const Login = () => {
  const loguin = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isAuth: NextOrObserver<User> = user => {
    dispatch(setActiveUser({
      loading: true,
      userInfo: {
        email: user?.displayName,
        name: user?.email
      },
      userToken: user?.uid
    }))
  }

  // add (login)
  const login = () => {
    signWithGoogle()
    navigate('/')
  }

  useEffect(() => {
    observerAuth(isAuth)
  }, [loguin])

  return (
    <Wrapper>
      <em>Login with Google</em>
      <Base onClick={login} />
    </Wrapper>
  )
}

export default Login