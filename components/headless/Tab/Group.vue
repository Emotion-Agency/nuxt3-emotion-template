<script lang="ts" setup>
interface IProps {
  as?: string
  defaultIndex?: number
  selectedIndex?: number
}

withDefaults(defineProps<IProps>(), {
  as: 'div',
  defaultIndex: 0,
  selectedIndex: 0,
})

const emit = defineEmits(['change'])

const activeTab = ref(0)

function setActiveTab(index: number) {
  activeTab.value = index
  emit('change', index)
}

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)

const tabRefs = ref([])
const panelRefs = ref([])
provide('tabRefs', tabRefs)
provide('panelRefs', panelRefs)
</script>

<template>
  <component :is="as" data-tabs-group>
    <slot :active-tab="activeTab" />
  </component>
</template>
