/**
 * Formats a raw date string to a human-readable date string
 */
export const formattedRawDate = (date: string) => {
  const formattedRawDate = date.replace(/\//g, '-')

  const [datePart, timePart] = formattedRawDate.split(' ')
  const [hours, minutes] = timePart.split(':').map((num) => num.padStart(2, '0'))

  const isoDate = `${datePart}T${hours}:${minutes}:00Z`

  const dateObj = new Date(isoDate)
  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return formattedDate
}
