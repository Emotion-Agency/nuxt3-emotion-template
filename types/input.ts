import type { ErrorObject } from '@vuelidate/core'

export interface iInputData {
  id: string
  value: string
  error: boolean
}

export interface IInputRoot {
  label?: string
  description?: string
  id?: string
}

export interface IInput extends IInputRoot {
  type?: string
  name?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  autoFocus?: boolean
  required?: boolean
  errors?: ErrorObject[]
}

export type TInputEmits = {
  (event: 'input', value: iInputData): void
  (event: 'focus' | 'blur'): void
  (event: 'error', error: string): void
}
