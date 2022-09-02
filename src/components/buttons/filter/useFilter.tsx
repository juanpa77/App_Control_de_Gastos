import { ChangeEvent, useEffect } from "react"
import { sharingFilter } from "../../transaction-list/services/sharing-filter"
import { Filters } from '../../transaction-list/index'

type Props = `${keyof Filters}`

export const useFilter = (name: Props) => {
  // const [selected, setSelected] = useState('')
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    sharingFilter.setSubject = {
      name,
      value: e.target.value
    }
  }

  useEffect(() => {
    sharingFilter.getSubject.subscribe({
      next: (filters) => {
        // setSelected(filters[name])
      }
    })
  })

  return handleFilter
}
