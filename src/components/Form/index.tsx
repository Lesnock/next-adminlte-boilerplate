/* eslint-disable */
import { createContext, useState, useContext, useCallback, FormEvent, useEffect } from 'react'
import { AnySchema, ValidationError, object } from 'yup'

import { ReactProps } from 'types'
import { isEmptyObject, emptyKeysToNull } from 'helpers'

type FormContextType = {
  registerField: (name: string) => void
  updateValue: (name: string, value: any) => void
  initialData: { [key: string]: any }
  errors: { [key: string]: string }
  getFieldError: (name: string) => string
}

const FormContext = createContext<FormContextType>({
  registerField: (name: string) => {},
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
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})

  const registerField = useCallback((name: string) => {
    return setFields(prev => {
      return { ...prev, [name]: initialData[name] }
    })
  }, [])

  const updateValue = useCallback((name: string, value: any) => {
    setFields(prev => {
      return { ...prev, [name]: value }
    })
  }, [])

  const getFieldError = useCallback((name: string) => {
    return errors[name]
  }, [])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanData = emptyKeysToNull(fields)

    if (!isEmptyObject(validations)) {
      try {
        const validated = object(validations).validateSync(cleanData, { abortEarly: false })

        if (validated) {
          setFields(validated)
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
    <FormContext.Provider value={{ initialData, updateValue, errors, getFieldError, registerField }}>
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
