import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'
import { useInputContext } from './inputContext'

export const useCheckbox = (props: ICheckbox, emit: TCheckboxEmits) => {
  const isFocused = ref(false)

  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const onFocus = () => {
    isFocused.value = true
  }

  const onBlur = () => {
    isFocused.value = false
  }

  const $input = ref<HTMLInputElement | null>(null)

  const checked = ref(props.checked)

  watch(
    () => props.checked,
    value => {
      checked.value = value
    }
  )

  const onChange = () => {
    emit('change', {
      id: props.id,
      checked: checked.value,
      error: error.value,
    })
  }

  const error = computed(() => {
    return props.required && !checked.value
  })

  return { $input, checked, error, onFocus, onBlur, onChange, isFocused }
}
