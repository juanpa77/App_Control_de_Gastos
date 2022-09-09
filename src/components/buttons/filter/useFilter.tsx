import { ChangeEvent, useEffect } from "react"
import { sharingFilter } from "../../transaction-list/services/sharing-filter"
import { Filters } from '../../transaction-list/index'

type Props = `${keyof Filters}`

export const useFilter = (name: Props) => {
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    sharingFilter.setSubject = {
      name,
      value: e.target.value
    }
  }

  useEffect(() => {
    sharingFilter.getSubject.subscribe({
      next: (filters) => filters
    })
  })

  return handleFilter
}
