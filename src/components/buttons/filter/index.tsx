import { Filters } from "../../transaction-list"
import { Date } from "../filter/styled"
import { useFilter } from "./useFilter"

type Props = {
  options: string[]
  name: `${keyof Filters}`
  initValue?: string
}

const DateFilter = ({ options, name, initValue }: Props) => {
  const [selected, handleFilter] = useFilter(name)

  return (
    <Date
      onChange={(e) => handleFilter(e)}
      defaultValue={initValue}
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