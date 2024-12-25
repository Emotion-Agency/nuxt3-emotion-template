# Headless Multiselect Component

This component provides a customizable and accessible multiselect input field for selecting multiple options from a list. It supports searching, removing selected options, and keyboard navigation.

## Features

- Searchable options list.
- Dynamic width for search input based on the length of the text.
- Ability to remove selected options.
- Keyboard navigation with `Backspace` to remove the last selected option when the search input is empty.
- Customizable UI with scoped slots and transition effects.

## Usage

### Script Setup

```vue
<script lang="ts" setup>
import type { IOption } from '~/types/headless/input'

const selectedOption = ref<IOption[]>([]) // Stores selected options

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
] // Available options

const search = ref('') // Search query

// Filtered options excluding already selected options and matching the search query
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
  search.value = '' // Clear search input on selection change
})

// Compute dynamic width for the search input based on the length of the search text
const inputWidth = computed(() => search.value.length)

// Function to remove a selected option
const removeSelectedOption = (option: IOption) => {
  selectedOption.value = selectedOption.value.filter(
    opt => opt.value !== option.value
  )
}

// Handle `Backspace` key press to remove the last selected option
const onBackSpace = () => {
  if (search.value.length || !filteredOptions.value.length) return
  const lastOption = selectedOption.value[selectedOption.value.length - 1]
  if (lastOption) removeSelectedOption(lastOption)
}
</script>
```

### Template

```vue
<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel for="select">Label</HeadlessInputLabel>
    <HeadlessInputMultiselect
      id="select"
      v-model="selectedOption"
      class="select"
    >
      <!-- Selected options -->
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
          <LucideChevronsUpDown :size="16" />
        </span>
      </HeadlessInputSelectButton>

      <!-- Options dropdown -->
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
```

### Styles

```vue
<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding-right: 8px;
  background-color: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: #bdbdbd;
  }

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
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
    cursor: pointer;
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
    cursor: pointer;

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
  outline: none;
  background-color: transparent;
}

.select__actions {
  display: flex;
  margin-left: auto;
  position: relative;
  z-index: 2;
}
</style>
```

## Props

| Prop      | Type        | Description                |
| --------- | ----------- | -------------------------- |
| `v-model` | `IOption[]` | Bound to selected options. |

## Events

| Event               | Description                       |
| ------------------- | --------------------------------- |
| `update:modelValue` | Emits when the selection changes. |

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `default` | Default slot for custom content. |

This component is designed to provide a smooth multiselect experience with full control over styles and behaviors.
