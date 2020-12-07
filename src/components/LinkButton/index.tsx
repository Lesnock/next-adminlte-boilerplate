import { isPlainObject } from 'jquery'
import React from 'react'
import Link from 'next/link'

import { ReactProps } from 'types'
import styles from './Styles.module.css'

type LinkButtonProps = {
  type?: string
  href: string
}

const LinkButton = ({
  type = 'primary',
  href,
  children
}: LinkButtonProps & ReactProps) => {
  return (
    <Link href={href}>
      <a type="button" className={`btn btn-${type} btn-sm ${styles.container}`}>
        {children}
      </a>
    </Link>
  )
}

export default LinkButton
