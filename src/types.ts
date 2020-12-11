import { ReactNode } from 'react'

export interface GenericObject {
  [key: string]: any
}

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
  small?: boolean
}

export interface Product extends GenericObject {
  id: number
  name: string
  ncm: string
  protheus_cod: string
  last_price: number
  unity: string
  quantity: number
  min_quantity: number
  max_quantity: number
}
