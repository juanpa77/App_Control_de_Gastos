

export const arrayGenerator = (numberItems: number) => {
  const array = [...new Array(numberItems)].map((e, i) => (i + 1).toString())
  return array
}