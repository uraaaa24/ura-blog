/** 文字列の日付を変換する(yyyy/MM/dd) */
export const convertDate = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
