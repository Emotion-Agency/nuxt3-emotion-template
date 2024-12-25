import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'
import { useInputContext } from './inputContext'
import type { ModelRef } from 'vue'

export const useSelect = (
  props: ISelect,
  emit: TSelectEmits,
  model: ModelRef<IOption | IOption[]>
) => {
  const inputCtx = useInputContext()

  if (inputCtx) {
    inputCtx.value = { ...inputCtx.value, ...props }
  }

  const isOpen = ref(false)
  const options = reactive<ISelectOption[]>([])

  const error = ref<boolean | string>(false)

  const $selectContainer = ref(null)

  function toggleDropdown() {
    if (props.disabled) return
    isOpen.value = !isOpen.value
  }

  const validate = () => {
    if (Array.isArray(model.value)) {
      return
    }

    if (props.validators) {
      const value = model.value?.value

      if (!value) {
        return
      }

      const falsyValidator = props.validators.find(validator =>
        validator(value)
      )

      if (falsyValidator) {
        error.value = falsyValidator(value)
        emit('error', error.value as string)
      } else {
        error.value = false
      }
    }
  }

  function selectOption(option: IOption) {
    if (Array.isArray(model.value)) {
      const isThisOptionSelected = model.value.some(({ value }) => {
        return value === option.value
      })

      if (isThisOptionSelected) {
        model.value = model.value.filter(({ value }) => value !== option.value)
      } else {
        model.value = [...model.value, option]
      }

      nextTick(() => {
        validate()

        const emitItem = (model.value as IOption[]).map(i => {
          return {
            value: i.value,
            label: i.label,
            id: props.id,
            error: !!error.value,
          }
        })

        emit('change', emitItem)

        if (inputCtx) {
          inputCtx.value = {
            ...inputCtx.value,
            value: model.value,
            error: error.value,
          }
        }
      })

      return
    }

    model.value = option

    nextTick(() => {
      validate()

      emit('change', {
        value: option.value,
        label: option.label,
        id: props.id,
        error: !!error.value,
      })

      if (inputCtx) {
        inputCtx.value = {
          ...inputCtx.value,
          value: option,
          error: error.value,
        }
      }
    })
  }

  onClickOutside($selectContainer, () => (isOpen.value = false))

  return {
    isOpen,
    options,
    error,
    $selectContainer,
    toggleDropdown,
    selectOption,
  }
}
