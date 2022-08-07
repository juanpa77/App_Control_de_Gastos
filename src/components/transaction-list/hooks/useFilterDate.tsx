import { ChangeEvent, useState } from "react"

const useFilterDate = (initValue: string) => {
  const [filter, setFilter] = useState(initValue)

  const updateFilter = (e: ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)

  return [filter, updateFilter] as const
}

export default useFilterDate