<script lang="ts" setup>
import type { IOption } from '~/types/headless/input'

const selectedOption = ref<IOption[]>([])

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const search = ref('')

const filteredOptions = computed(() =>
  options
    .filter(option =>
      selectedOption.value.every(opt => opt.value !== option.value)
    )
    .filter(option =>
      option.label.toLowerCase().includes(search.value.toLowerCase())
    )
)

watch(selectedOption, () => {
  search.value = ''
})

const inputWidth = computed(() => {
  return search.value?.length
})

const removeSelectedOption = (option: IOption) => {
  selectedOption.value = selectedOption.value.filter(
    opt => opt.value !== option.value
  )
}

const onBackSpace = () => {
  if (search.value.length || !filteredOptions.value?.length) return

  const lastOption = selectedOption.value[selectedOption.value?.length - 1]

  console.log(search.value.length)

  if (lastOption) {
    removeSelectedOption(lastOption)
  }
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel for="select">Label</HeadlessInputLabel>
    <HeadlessInputMultiselect
      id="select"
      v-model="selectedOption"
      class="select"
    >
      <HeadlessInputSelectButton class="select__button">
        <button
          v-for="(opt, idx) in selectedOption"
          :key="idx"
          @click="removeSelectedOption(opt)"
        >
          {{ opt.label }}
        </button>
        <HeadlessInput
          id="select-search-2"
          v-model="search"
          class="select__input"
          type="text"
          autocomplete="off"
          :style="{ '--width': `${inputWidth}ch` }"
          @keydown.delete="onBackSpace"
        />

        <span class="select__actions">
          <span>
            <LucideChevronsUpDown :size="16" />
          </span>
        </span>
      </HeadlessInputSelectButton>
      <Transition name="fade">
        <HeadlessInputSelectOptions class="select__options">
          <HeadlessInputSelectOption
            v-for="option in filteredOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            class="select__option"
          >
            {{ option.label }}
          </HeadlessInputSelectOption>
        </HeadlessInputSelectOptions>
      </Transition>
    </HeadlessInputMultiselect>
    <HeadlessInputValidationMessage v-if="field.error">{{
      field.error
    }}</HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: #bdbdbd;
  }

  &__button {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    color: #333;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: #1976d2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }
  }

  &__options {
    position: absolute;
    z-index: 10;
    width: 100%;
    margin-top: 4px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    padding: 4px 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #bdbdbd;
      border-radius: 4px;
    }
  }

  &__option {
    padding: 8px 12px;
    font-size: 1rem;
    color: #333;
    display: block;
    width: 100%;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &[data-selected='true'] {
      background-color: #e3f2fd;
      color: #1976d2;
      font-weight: 500;
    }
  }
}

.select__input {
  --width: 46px;
  height: 100%;
  flex: 1 1 auto;
  padding: 12px;
  width: var(--width);
  background-color: transparent;
}

.select__actions {
  display: flex;
  margin-left: auto;
  position: relative;
  z-index: 2;
}
</style>
