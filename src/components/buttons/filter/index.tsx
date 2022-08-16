import { ChangeEvent } from "react"
import { sharingFilter } from "../../transaction-list/services/sharing-filter"
import { Date } from "../filter/styled"

type Props = {
  options: string[]
  dateSelected: string
  change: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DateFilter = ({ dateSelected, options, change }: Props) => {
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => sharingFilter.setSubject = e.target.value

  return (
    <Date onChange={(e) => handleFilter(e)} value={dateSelected}>
      {options.map(option => {
        return (
          <option value={option} key={option} >{option}</option>
        )
      })}
    </Date>
  )
}

export default DateFilter