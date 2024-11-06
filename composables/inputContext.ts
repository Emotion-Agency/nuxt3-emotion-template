import type { IInputContext } from '~/types/input'

const InputContextKey = 'inputContext'

export function provideInputContext(
  initialValue: IInputContext = {} as IInputContext
): Ref<IInputContext> {
  const inputValue = ref(initialValue)
  provide(InputContextKey, inputValue)
  return inputValue
}

export function useInputContext(): Ref<IInputContext> {
  const context = inject<Ref<IInputContext>>(InputContextKey)
  if (!context) {
    throw new Error('Input context not found. Make sure to provide it first.')
  }
  return context
}
