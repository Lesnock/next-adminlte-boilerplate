import { Router } from 'next/router'

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

// eslint-disable-next-line
export function setURLParams(router: Router, params: { [key: string]: any }) {
  router.push(
    {
      query: { ...router.query, ...params }
    },
    undefined,
    { shallow: true }
  )
}

/**
 * Verify if a object is empty
 * @param object
 */
// eslint-disable-next-line
export function isEmptyObject(object: { [key: string]: any }) {
  return Object.keys(object).length === 0
}

/**
 * Transform all empty strings in null inside a object
 * @param object
 */
export function emptyKeysToNull(object = {}) {
  const cleaned = {}

  Object.keys(object).forEach((key) => {
    if (object[key] === '') {
      cleaned[key] = null
    } else {
      cleaned[key] = object[key]
    }
  })

  return cleaned
}
