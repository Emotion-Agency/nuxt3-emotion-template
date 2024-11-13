<template>
  <HeadlessDropdownMenu class="dropdown-menu">
    <HeadlessDropdownTrigger>Open Menu</HeadlessDropdownTrigger>

    <Teleport to="#teleports">
      <Transition name="fade">
        <HeadlessDropdownItems
          position-x="right"
          position-y="bottom"
          class="dropdown-items"
        >
          <HeadlessDropdownItem class="dropdown-item"
            >Option 1</HeadlessDropdownItem
          >
          <HeadlessDropdownItem class="dropdown-item"
            >Option 2</HeadlessDropdownItem
          >
          <HeadlessDropdownItem class="dropdown-item"
            >Option 3</HeadlessDropdownItem
          >
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>
</template>

<style scoped langs="scss">
.dropdown-menu {
  position: fixed;
  left: 50%;
  top: 50%;
}

.dropdown-items {
  width: 300px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #f0f0f0;
}
</style>
