const isDayGreaterThan10 = (date: Date)=> {
    const day = date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate();
    return day
}

export const formatDate = (date: Date): string=> {
    const formatted_date = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`
    return formatted_date
}