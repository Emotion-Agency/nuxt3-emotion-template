<template>
  <HeadlessDropdownMenu class="dropdown-menu">
    <HeadlessDropdownTrigger class="dropdown-btn"
      >Open Menu</HeadlessDropdownTrigger
    >

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

<style scoped lang="scss">
.dropdown-menu {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}

.dropdown-items {
  width: 280px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #e0e0e0;
  z-index: 1000;
}

.dropdown-item {
  padding: 12px 20px;
  font-size: 0.95rem;
  color: #333333;
  transition:
    background-color 0.2s,
    color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    background-color: #f5f5f5;
    color: #1976d2;
  }

  &:active {
    background-color: #e3f2fd;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
}

.dropdown-btn {
  background-color: transparent;
}
</style>
