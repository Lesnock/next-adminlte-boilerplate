/* eslint-disable */
import { createContext, useState, useContext, FormEvent } from 'react'
import { AnySchema, ValidationError, object } from 'yup'

import { ReactProps } from 'types'
import { isEmptyObject, emptyKeysToNull } from 'helpers'

type FormContextType = {
  updateValue: (name: string, value: any) => void
  initialData: { [key: string]: any }
  errors: { [key: string]: string }
  getFieldError: (name: string) => string
}

const FormContext = createContext<FormContextType>({
  updateValue: (name: string, value: any) => {},
  initialData: {},
  errors: {},
  getFieldError: (name: string) => ''
})

type FormProps = {
  initialData?: { [key: string]: any }
  validations?: { [key: string]: AnySchema }
  onSubmit: (values: { [key: string]: any }) => any
}

const Form = ({ children, initialData = {}, validations = {}, onSubmit }: ReactProps & FormProps) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  function updateValue(name: string, value: any) {
    setValues({ ...values, [name]: value })
  }

  function getFieldError(name: string) {
    return errors[name]
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanData = emptyKeysToNull(values)

    if (!isEmptyObject(validations)) {
      try {
        const validated = object(validations).validateSync(cleanData, { abortEarly: false })

        if (validated) {
          setValues(validated)
        }

        // Clean errors
        setErrors({})

        // Submit
        onSubmit(validated)
      } catch (error) {
        const validationErrors = {}

        if (ValidationError.isError(error)) {
          error.inner.forEach(err => validationErrors[err.path!] = err.message)
        }

        setErrors(validationErrors)
      }
    } else {
      // Clean errors
      setErrors({})

      // Submit
      onSubmit(cleanData)
    }
  }

  return (
    <FormContext.Provider value={{ initialData, updateValue, errors, getFieldError }}>
      <form style={{ width: '100%' }} onSubmit={submit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}

export default Form
