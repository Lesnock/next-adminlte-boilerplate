import React from 'react'

import { ReactProps } from 'types'

type Props = {
  type?: string
}

const Submit = ({ children, type = 'primary' }: ReactProps & Props) => {
  return (
    <button type="submit" className={`btn btn-${type}`}>
      {children}
    </button>
  )
}

export default Submit
