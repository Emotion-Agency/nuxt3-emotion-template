<script setup lang="ts">
interface IProps {
  as?: string
}

const props = withDefaults(defineProps<IProps>(), {
  as: 'div',
})
const activeTab: Ref<number> = inject('activeTab')
const panelRefs: Ref<any> = inject('panelRefs')

const panelElement = ref<HTMLElement | null>(null)

const index = computed(() => panelRefs.value.indexOf(panelElement.value))

onMounted(() => {
  if (panelElement.value) {
    panelRefs.value.push(panelElement.value)
  }

  console.log(panelElement.value)
})

const tabId = `tab-${index.value}`
const isActive = computed(() => activeTab.value === index.value)
</script>

<template>
  <component
    ref="panelElement"
    :is="as"
    v-show="isActive"
    data-tabs-item
    role="tabpanel"
    :aria-labelledby="tabId"
    tabindex="0"
    class="tab-panel"
  >
    <slot></slot>
  </component>
</template>
