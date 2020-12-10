import React, { useEffect, useState } from 'react'

import { useForm } from 'components/Form'

type Option = {
  title: string
  value: string | number | readonly string[] | undefined
}

type Props = {
  name: string
  label: string
  col?: number
  options: Option[]
}

const Select = ({ name, label, col = 6, options = [] }: Props) => {
  const { registerField, updateValue, errors, initialData } = useForm()
  const [isInvalid, setIsInvalid] = useState(false)

  // Register field
  useEffect(() => {
    registerField(name)
  }, [registerField, name])

  // Set isInvalid
  useEffect(() => {
    setIsInvalid(!!errors[name])
  }, [errors, name])

  return (
    <div className={`col col-${col}`}>
      <div className="form-group">
        <label>{label}</label>
        <select
          name={name}
          defaultValue={initialData[name]}
          className={`form-control select2 ${isInvalid ? 'is-invalid' : ''}`}
          style={{ width: '100%' }}
          onChange={(event) => updateValue(name, event.target.value)}
        >
          {options.map(({ title, value }, index) => (
            <option key={index} value={value}>
              {title}
            </option>
          ))}
        </select>
        {isInvalid && (
          <span className="error invalid-feedback">{errors[name]}</span>
        )}
      </div>
    </div>
  )
}

export default Select
