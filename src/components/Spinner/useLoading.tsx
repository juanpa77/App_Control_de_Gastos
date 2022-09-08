import { useState } from "react"

const useLoading = (action: () => Promise<any>) => {
  const [loading, setLoading] = useState(false)
  const doAction = async () => {
    setLoading(true)
    console.log(loading)
    try {
      // action()
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      setLoading(false)
    }
  }

  return [doAction, loading] as const
}

export default useLoading