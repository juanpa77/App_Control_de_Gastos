
export const formatDate = (date: Date): string=> {
    const formatted_date = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    return formatted_date
}

export const splitDate = (date: string)=> {
    const formatDate = date.split('-').reverse()
    return formatDate
}
