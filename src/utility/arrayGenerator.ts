

export const arrayGenerator = (numberItems: number, element?: string) => {
  const array = [...new Array(numberItems)].map((e, i) => (i + 1).toString())
  element && array.push(element)
  return array
}