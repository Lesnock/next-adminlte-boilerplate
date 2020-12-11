import React, { useEffect, useState } from 'react'

import { useForm } from 'components/Form'

type Props = {
  label: string
  name: string
  col?: number
  [prop: string]: any //eslint-disable-line
}

const InputMoney = ({ label, name, col = 6, ...rest }: Props) => {
  const { registerField, updateValue, initialData, errors } = useForm()
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    registerField(name)
  }, [registerField, name])

  useEffect(() => {
    setIsInvalid(!!errors[name])
  }, [errors, name])

  useEffect(() => {
    $('.money').mask('000.000.000.000.000,00', { reverse: true, onKeyPress })
  })

  function onKeyPress(value: string) {
    const float = value.replace('.', '').replace(',', '.')
    updateValue(name, float)
  }

  return (
    <div className={`col-md-${col}`}>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="text"
          name={name}
          className={`money form-control ${isInvalid ? 'is-invalid' : ''}`}
          defaultValue={initialData[name]}
          {...rest}
        />
        {isInvalid && (
          <span className="error invalid-feedback">{errors[name]}</span>
        )}
      </div>
    </div>
  )
}

export default InputMoney
