export const toCurrencyString = (number) => {
  return number < 0 ? `-$${number}` : `$${number}`
}
