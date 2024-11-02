<script setup lang="ts">
interface IProps {
  as?: string
  disabled?: boolean
}

withDefaults(defineProps<IProps>(), {
  as: 'button',
})
const activeTab: Ref<number> = inject('activeTab')
const setActiveTab: any = inject('setActiveTab')

const tabRefs: Ref<any> = inject('tabRefs')

const tabElement = ref<HTMLElement | null>(null)
const index = computed(() => tabRefs.value.indexOf(tabElement.value))

onMounted(() => {
  if (tabElement.value) {
    tabRefs.value.push(tabElement.value)
  }

  console.log(tabRefs.value)
})

const isSelected = computed(() => activeTab.value === index.value)

function selectTab() {
  setActiveTab(index.value)
}

function handleKeydown(event: KeyboardEvent) {
  const keys = { ArrowRight: 1, ArrowLeft: -1 }
  if (keys[event.key] !== undefined) {
    event.preventDefault()
    setActiveTab((activeTab.value + keys[event.key] + 3) % 3)
  }
}

// const tabId = `tab-${index.value}`;
const panelId = `panel-${index.value}`
</script>

<template>
  <component
    ref="tabElement"
    :is="as"
    :role="'tab'"
    :aria-disabled="disabled"
    :disabled="disabled"
    data-tabs-button
    :aria-selected="isSelected"
    :aria-controls="panelId"
    :tabindex="isSelected ? 0 : -1"
    @click="selectTab"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </component>
</template>
