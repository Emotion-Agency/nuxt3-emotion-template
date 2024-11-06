export interface iInputData {
  id: string
  value: string
  error: boolean
}

export interface IInput {
  required?: boolean
  id: string
  name?: string
  type?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  autoFocus?: boolean
  validators?: Array<(value: string) => boolean | string>
}

export interface IInputContext extends IInput {
  error: boolean | string
}

export type TInputEmits = {
  (event: 'input', value: iInputData): void
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'error', error: string): void
}
