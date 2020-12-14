import React, { HTMLAttributes } from 'react'

import { ReactProps } from 'types'
import styles from './Styles.module.css'

type Props = {
  type?: string
  size?: string
}

const Button = ({
  type = 'primary',
  size = 'sm',
  children,
  ...rest
}: Props & ReactProps & HTMLAttributes<HTMLButtonElement>) => {
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
