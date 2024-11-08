import type { IInput, iInputData, TInputEmits } from '~/types/input'

export const useInput = (props: IInput, emit: TInputEmits) => {
  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const $input = ref<HTMLInputElement | null>(null)
  const inputValue = ref(props.value)

  const error = ref<boolean | string>(false)
  const isFocused = ref(false)

  const validate = () => {
    if (props.validators) {
      const falsyValidator = props.validators.find(validator =>
        validator(inputValue.value)
      )

      if (falsyValidator) {
        error.value = falsyValidator(inputValue.value)
        emit('error', error.value as string)
      } else {
        error.value = false
      }
    }
  }

  const onChange = () => {
    validate()

    emit('input', {
      id: props.id,
      value: inputValue.value,
      error: !!error.value,
    } as iInputData)

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: inputValue.value,
        error: error.value,
      }
    }
  }

  const onFocus = () => {
    isFocused.value = true
    emit('focus')
  }

  const onBlur = () => {
    isFocused.value = false
    emit('blur')
  }

  const reset = () => {
    inputValue.value = ''
    error.value = false
  }

  const updateFields = () => {
    if (inputValue.value.trim() !== '') {
      emit('input', {
        id: props.id,
        value: inputValue.value,
        error: error.value,
      } as iInputData)
    }
  }

  watch(
    () => props.value,
    () => {
      console.log(props.value)
      inputValue.value = props.value
      updateFields()
    }
  )

  return {
    $input,
    inputValue,
    error,
    isFocused,
    onChange,
    onFocus,
    onBlur,
    reset,
    validate,
  }
}
