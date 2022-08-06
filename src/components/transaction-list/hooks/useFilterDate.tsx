import { ChangeEvent, useState } from "react"

const useFilterDate = () => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const [filter, setFilter] = useState(months[new Date().getMonth()])

  const updateFilter = (e: ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)

  return [months, filter, updateFilter] as const
}

export default useFilterDate