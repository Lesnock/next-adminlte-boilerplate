import React, { ChangeEvent } from 'react'

import tableStore from 'stores/TableStore'

type Props = {
  onChange: (search: string) => void
}

const SearchBar = ({ onChange }: Props) => {
  type Timeout = NodeJS.Timeout | undefined

  let timeout: Timeout = undefined
  const done = 300

  const onType = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      onChange(event.target.value)
    }, done)
  }

  return (
    <div className="input-group input-group-sm" style={{ width: 400 }}>
      <input
        type="text"
        name="table_search"
        className="form-control float-right"
        placeholder="Pesquisa"
        defaultValue={tableStore.get('search')}
        onChange={onType}
      />
      <div className="input-group-append">
        <button type="submit" className="btn btn-default">
          <i className="fas fa-search" />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
