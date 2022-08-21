import { ChangeEvent, useState } from "react"
import { sharingFilter } from "../../transaction-list/services/sharing-filter"
import { Date } from "../filter/styled"

type Props = {
  options: string[]
  name: string
  initValue?: string
}

const DateFilter = ({ options, name, initValue }: Props) => {
  // const [selected, setSelected] = useState('')
  const getFilter = sharingFilter.getSubject.subscribe({ next: (v) => setSelected(v.month) })
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => sharingFilter.setSubject = { name, value: e.target.value }

  return (
    <Date
      onChange={(e) => handleFilter(e)}
      value={filter.month}
    >
      {options.map(option => {
        return (
          <option
            key={option}
          >
            {option}
          </option>
        )
      })}
    </Date>
  )
}

export default DateFilter