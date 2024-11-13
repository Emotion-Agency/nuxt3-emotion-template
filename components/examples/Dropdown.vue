<template>
  <HeadlessDropdownMenu class="dropdown-menu">
    <HeadlessDropdownTrigger>Open Menu</HeadlessDropdownTrigger>

    <HeadlessDropdownItems>
      <HeadlessDropdownItem>Option 1</HeadlessDropdownItem>
      <HeadlessDropdownItem>Option 2</HeadlessDropdownItem>
      <HeadlessDropdownItem>Option 3</HeadlessDropdownItem>
    </HeadlessDropdownItems>
  </HeadlessDropdownMenu>
</template>

<style scoped langs="scss">
.dropdown-menu {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
