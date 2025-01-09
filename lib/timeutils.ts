export function getAgoDuration(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) {
    return `a few moments ago`
  } else if (seconds < 60 * 60) {
    return `${Math.floor(seconds / 60)} minutes ago`
  } else if (seconds < 60 * 60 * 24) {
    return `${Math.floor(seconds / 60 / 60)} hours ago`
  } else if (seconds < 60 * 60 * 24 * 7) {
    return `${Math.floor(seconds / 60 / 60 / 24)} days ago`
  } else if (seconds < 60 * 60 * 24 * 30) {
    return `${Math.floor(seconds / 60 / 60 / 24 / 7)} weeks ago`
  } else if (seconds < 60 * 60 * 24 * 365) {
    return `${Math.floor(seconds / 60 / 60 / 24 / 30)} months ago`
  } else {
    return `${Math.floor(seconds / 60 / 60 / 24 / 365)} years ago`
  }
}