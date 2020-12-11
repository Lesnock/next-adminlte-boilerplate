import React from 'react'

import { ReactProps } from 'types'
import styles from './Styles.module.css'

type LinkButtonProps = {
  type?: string
  size?: string
  [key: string]: any
}

const Button = ({
  type = 'primary',
  size = 'sm',
  children,
  ...rest
}: LinkButtonProps & ReactProps) => {
  return (
    <button
      type="button"
      className={`btn btn-${type} btn-${size} ${styles.container}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
