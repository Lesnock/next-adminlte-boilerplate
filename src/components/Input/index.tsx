import React, { useEffect, useState } from 'react'

import { useForm } from 'components/Form'

type Props = {
  label: string
  name: string
  mask?: string
  maskOptions?: { [key: string]: any } //eslint-disable-line
  col?: number
  [prop: string]: any //eslint-disable-line
}

const Input = ({
  label,
  name,
  col = 6,
  mask,
  maskOptions = {},
  ...rest
}: Props) => {
  const { registerField, updateValue, initialData, errors } = useForm()
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    registerField(name)
  }, [registerField, name])

  useEffect(() => {
    setIsInvalid(!!errors[name])
  }, [errors, name])

  useEffect(() => {
    if (mask) {
      $(`input[name=${name}]`).mask(mask, maskOptions)
    }
  })

  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="text"
          name={name}
          className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
          defaultValue={initialData[name]}
          onChange={(event) => updateValue(name, event.target.value)}
          {...rest}
        />
        {isInvalid && (
          <span className="error invalid-feedback">{errors[name]}</span>
        )}
      </div>
    </div>
  )
}

export default Input
