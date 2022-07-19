import { useState } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState(false);
  const triggerToggle = () => setToggle(!toggle)

  return [toggle, triggerToggle] as const
}

export default useToggle 