const isDayGreaterThan10 = (date: Date)=> {
    const day = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
    return day
}

export const formatDate = (date: Date): string=> {
    const formatted_date = `${date.getFullYear()}-0${date.getMonth()+1}-${isDayGreaterThan10(date)}`
    return formatted_date
}