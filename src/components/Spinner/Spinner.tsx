// import { useEffect, useState } from "react"
import { SpinnerCircle } from "./styled"
// import useLoading from "./useLoading"

// type Props = {
//   trigger: () => Promise<any>
// }

const Spinner = () => {
  const isLoading = false

  return isLoading
    ? <SpinnerCircle />
    : <></>
}

export default Spinner
