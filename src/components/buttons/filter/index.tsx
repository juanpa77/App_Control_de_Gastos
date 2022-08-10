import { ChangeEvent } from "react"
import { Date } from "../filter/styled"

type Props = {
  options: string[]
  dateSelected: string
  change: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DateFilter = ({ dateSelected, options, change }: Props) => {

  return (
    <Date onChange={(e) => change(e)} value={dateSelected}>
      {options.map(option => {
        return (
          <option value={option} key={option} >{option}</option>
        )
      })}
    </Date>
  )
}

export default DateFilter