import { useState } from "react";
import { sharingFilter } from "../../transaction-list/services/sharing-filter";

const useToggle = () => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = (valueType: string) => {
    let isActive = true

    sharingFilter.getSubject.subscribe(filers => {
      if (isActive) {
        filers.type === 'Icome' ? setIsActive(true) : setIsActive(false)
      }
    })
    sharingFilter.setSubject = {
      name: 'type',
      value: valueType
    }
    isActive = false
  }
  return [isActive, handleToggle] as const
}
export default useToggle 