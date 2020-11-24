import { ReactNode } from 'react'

export interface User {
  name: string
  username: string
  email: string
}

export interface ReactProps {
  children?: ReactNode
}
