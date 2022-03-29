
export const formatDate = (date: Date): string=> {
    const formatted_date = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    return formatted_date
}