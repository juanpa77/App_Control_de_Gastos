import { useState } from "react";
import { Filter } from "./styled";

const useToggle = () => {
  const [toggle, setToggle] = useState<Filter>({
    toggle: false,
    rigth: false,
    left: true
  })
  const triggerToggle = () => setToggle({
    toggle: !toggle.toggle,
    rigth: !toggle.rigth,
    left: !toggle.left
  })

  return [toggle, triggerToggle] as const
}

export default useToggle 