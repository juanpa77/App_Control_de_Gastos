import { useEffect, useState } from "react"
import { Observable } from "rxjs"
import { Filters } from ".."
import { formatNumberMonth } from "../../../utility/formatDate"
import { TransactionData } from "../../transaction-form/useTransaction"
import { sharingFilter } from "../services/sharing-filter"

const useFilterDate = (toggle: boolean) => {
  const subcritpionFilter = sharingFilter.getSubject
  const [filters, setFilters] = useState<Filters>({
    category: 'todas',
    week: 'todas',
    month: formatNumberMonth(new Date().getMonth()),
    type: toggle ? 'Income' : 'Expenses',
  })

  useEffect(() => {
    subcritpionFilter.subscribe(filter => {
      setFilters(filter)
    })
  }, [filters])

  return filters
}

export default useFilterDate