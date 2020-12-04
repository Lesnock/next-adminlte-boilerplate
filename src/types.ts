import { ReactNode } from 'react'

export interface User {
  name: string
  username: string
  email: string
}

export interface ReactProps {
  children?: ReactNode
}

export interface Config {
  api: {
    host: string
    port: number
  }
}

export interface TableHeader {
  label: string
  name: string
  sortable: boolean
  searchable: boolean
}
