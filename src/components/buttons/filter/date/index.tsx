import { ChangeEvent } from "react"
import { Date } from "./styled"

type Props = {
  filter: string[]
  dateSelected: string
  change: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DateFilter = ({ dateSelected, filter, change }: Props) => {

  return (
    <Date onChange={(e) => change(e)} value={dateSelected}>
      {filter.map(month => {
        return (
          <option value={month} key={month} >{month}</option>
        )
      })}
    </Date>
  )
}

export default DateFilter