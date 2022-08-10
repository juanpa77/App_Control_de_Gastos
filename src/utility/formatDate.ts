export const formatDate = (date: Date): string => {
  const formattedDate = `${date.getFullYear()}-0${date.getMonth() + 1
    }-${date.getDate()}`;
  return formattedDate;
};

export const splitDate = (date: string) => {
  const formatDate = date.split("-").reverse();
  return {
    day: formatDate[0],
    month: formatDate[1],
    year: formatDate[2]
  }
};

export const formatNumberMonth = (month: number): string => {
  const formatMonth = month + 1
  return formatMonth < 9
    ? '0' + formatMonth.toString()
    : formatMonth.toString()
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("es-ar", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(number);
};
