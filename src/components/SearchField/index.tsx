import React, { FormEvent } from 'react'

import { TableHeader } from '../../types'

type SearchField = {
  header: TableHeader
  onChange: (column: string, search: string) => void
}

const SearchField = ({ header, onChange }: SearchField) => {
  const timeout = null

  const onType = (event: FormEvent<HTMLInputElement>) => {}

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
