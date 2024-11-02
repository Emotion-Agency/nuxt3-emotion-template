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

const { activeTab, init, panels, registerPanel, registerTab, tabs } =
  useHeadlessTabs()

onMounted((): void => {
  init()
})

function setActiveTab(index: number) {
  activeTab.value = index
  emit('change', index)
}

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)

provide('tabs', tabs)
provide('panels', panels)

provide('registerTab', registerTab)
provide('registerPanel', registerPanel)
</script>

<template>
  <component :is="as" data-tabs-group>
    <slot :active-tab="activeTab" />
  </component>
</template>
