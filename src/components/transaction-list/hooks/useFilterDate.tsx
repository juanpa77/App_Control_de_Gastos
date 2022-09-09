import { useEffect, useState } from "react"
import { Filters } from ".."
import { formatNumberMonth } from "../../../utility/formatDate"
import { sharingFilter } from "../services/sharing-filter"

const useFilterDate = () => {
  const subcritpionFilter = sharingFilter.getSubject
  const [filters, setFilters] = useState<Filters>({
    category: 'todas',
    week: 'todas',
    month: formatNumberMonth(new Date().getMonth()),
    type: 'Expenses',
  })

  useEffect(() => {
    let isActive = true
    subcritpionFilter.subscribe(filter => {
      if (isActive) {
        setFilters(filter)
      }
    })

    return (() => { isActive = false })
  }, [filters])

  return filters
}

export default useFilterDate