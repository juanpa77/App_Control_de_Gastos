import { NextOrObserver, User } from "firebase/auth"
import { useEffect } from "react"
import { Base } from "../../components/buttons/styled"
import { setActiveUser } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/useAuth"
import { observerAuth, signWithGoogle } from "../../services/authProvider"
import { Wrapper } from "./styled"

const Login = () => {
  const loguin = useAppSelector(state => state)
  const dispatch = useAppDispatch()

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

  useEffect(() => {
    observerAuth(isAuth)
    console.log(loguin)
  }, [loguin])

  return (
    <Wrapper>
      <em>Login with Google</em>
      <Base onClick={() => signWithGoogle()} />
    </Wrapper>
  )
}

export default Login