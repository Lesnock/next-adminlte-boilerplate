import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

import { ReactProps } from '../types'

type PageState = {
  currentPage: number
  limit: number
  totalPage: number
  setCurrentPage: (page: number) => void
  setTotalPage: (total: number) => void
  setLimit: (limit: number) => void
}

const PageStateContext = createContext<PageState>({
  currentPage: 1,
  totalPage: 1,
  limit: 20,
  setCurrentPage: () => {
    /* */
  },
  setTotalPage: () => {
    /* */
  },
  setLimit: () => {
    /* */
  }
})

export function PageStateProvider({ children }: ReactProps) {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(Number(router.query.page))
    }

    if (router.query.limit) {
      setLimit(Number(router.query.page))
    }
  }, []) //eslint-disable-line

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const changeTotal = (total: number) => {
    setTotalPage(total)
  }

  const changeLimit = (limit: number) => {
    setLimit(limit)
  }

  useEffect(() => {
    console.log(limit)
  }, [limit])

  return (
    <PageStateContext.Provider
      value={{
        currentPage,
        totalPage,
        setTotalPage: changeTotal,
        setCurrentPage: changePage,
        limit,
        setLimit: changeLimit
      }}
    >
      {children}
    </PageStateContext.Provider>
  )
}

export function usePageState() {
  return useContext(PageStateContext)
}
