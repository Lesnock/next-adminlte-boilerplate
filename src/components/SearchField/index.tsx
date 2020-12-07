import React, { ChangeEvent } from 'react'

import { TableHeader } from 'types'

type SearchFieldProps = {
  header: TableHeader
  onChange: (column: string, search: string) => void
}

const SearchField = ({ header, onChange }: SearchFieldProps) => {
  type Timeout = NodeJS.Timeout | undefined

  let timeout: Timeout = undefined
  const done = 300

  const onType = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      onChange(header.name, event.target.value)
    }, done)
  }

  return (
    <input
      type="text"
      className="form-control float-right"
      placeholder={header.searchable ? `Pesquisar por ${header.label}` : '-'}
      disabled={!header.searchable}
      onChange={onType}
    />
  )
}

export default SearchField
