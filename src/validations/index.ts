import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    default: 'Dados inválidos',

    required: ({ path, label }) => `O campo ${label || path} é obrigatório`,

    oneOf: ({ path, label, values }) =>
      `O campo ${label || path} deve ser um dos seguintes valores: ${values}`,

    notOneOf: ({ path, label, values }) =>
      `O campo ${
        label || path
      } não pode ser um dos seguintes valores: ${values}`
  },
  string: {
    length: ({ path, label, length }) =>
      `O campo ${label || path} deve ter exatamente ${length} caracteres`,

    min: ({ path, label, length }) =>
      `O campo ${label || path} deve ter no mínio ${length} caracteres`,

    max: ({ path, label, length }) =>
      `O campo ${label || path} deve ter no máximo ${length} caracteres`,

    email: ({ path, label }) =>
      `O campo ${label || path} deve ser um e-mail válido`,

    url: ({ path, label }) => `O campo ${label || path} ser uma URL válida`,

    trim: ({ path, label }) =>
      `O campo ${label || path} não deve conter espaços no início e no fim`,

    lowercase: ({ path, label }) =>
      `O campo ${label || path} deve estar em minísculo`,

    uppercase: ({ path, label }) =>
      `O campo ${label || path} deve estar em maiúsculo`
  },
  number: {
    min: ({ path, label, min }) =>
      `O campo ${label || path} deve ser no mínimo ${min}`,

    max: ({ path, label, max }) =>
      `O campo ${label || path} deve ser no máximo ${max}`,

    lessThan: ({ path, label, less }) =>
      `O campo ${label || path} deve ser menor que ${less}`,

    moreThan: ({ path, label, more }) =>
      `O campo ${label || path} deve ser maior que ${more}`,

    notEqual: ({ path, label, notEqual }) =>
      `O campo ${label || path} deve ser igual à ${notEqual}`,

    positive: ({ path, label }) =>
      `O campo ${label || path} deve ser um número positivo`,

    negative: ({ path, label }) =>
      `O campo ${label || path} deve ser um número negativo`,

    integer: ({ path, label }) =>
      `O campo ${label || path} deve ser um número inteiro`
  },
  date: {
    min: ({ path, label, min }) =>
      `A data do campo ${label || path} deve ser no mínimo ${min}`,

    max: ({ path, label, max }) =>
      `A data do campo ${label || path} deve ser no máximo ${max}`
  },
  array: {
    min: ({ path, label, min }) =>
      `O campo ${label || path} deve ter no mínimo ${min}`,
    max: ({ path, label, max }) =>
      `O campo ${label || path} deve ter no máximo ${max}`
  }
})

export const string = (label: string) => {
  return Yup.string().label(label)
}

export const number = (label: string) => {
  return Yup.number()
    .label(label)
    .typeError(`O campo ${label} deve ser um número`)
}

export const mixed = (label: string) => {
  return Yup.mixed().label(label)
}

export const object = (label: string) => {
  return Yup.object().label(label)
}

export const bool = (label: string) => {
  return Yup.bool()
    .label(label)
    .typeError(`O campo ${label} deve ser do tipo verdadeiro/falso`)
}

export const boolean = (label: string) => {
  return Yup.boolean()
    .label(label)
    .typeError(`O campo ${label} deve ser do tipo verdadeiro/falso`)
}

export const date = (label: string) => {
  return Yup.date()
    .label(label)
    .typeError(`O campo ${label} deve ser do tipo data`)
}

export const array = (label: string) => {
  return Yup.array()
    .label(label)
    .typeError(`O campo ${label} deve ser do tipo array`)
}
