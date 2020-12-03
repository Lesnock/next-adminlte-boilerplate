export function delay(time = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function range(from: number, to: number) {
  const array = []
  for (let i = from; i <= to; i++) {
    array.push(i)
  }

  return array
}

export function calculatePagination(total: number, currentPage: number) {
  const neighbours = 4
  const maxButtons = 9

  let firstPage = currentPage - neighbours
  let lastPage = currentPage + neighbours

  if (firstPage < 1) {
    lastPage = maxButtons
  }

  if (lastPage > total) {
    firstPage = total - (maxButtons - 1)
  }

  firstPage = Math.max(1, firstPage)
  lastPage = Math.min(total, lastPage)

  const pages = range(firstPage, lastPage)

  return pages
}
