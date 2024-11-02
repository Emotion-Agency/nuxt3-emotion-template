<template>
  <HeadlessTabGroup>
    <!-- TabList -->
    <HeadlessTabButtonList>
      <HeadlessTabButton>Tab 1</HeadlessTabButton>
      <HeadlessTabButton disabled :index="1">Tab 2</HeadlessTabButton>
      <HeadlessTabButton>Tab 3</HeadlessTabButton>
      <HeadlessTabButton>Tab 4</HeadlessTabButton>
    </HeadlessTabButtonList>

    <!-- TabPanels -->
    <HeadlessTabItems>
      <HeadlessTabItem>Content for Tab 1</HeadlessTabItem>
      <HeadlessTabItem>Content for Tab 2</HeadlessTabItem>
      <HeadlessTabItem>Content for Tab 3</HeadlessTabItem>
      <HeadlessTabItem>Tab 4</HeadlessTabItem>
    </HeadlessTabItems>
  </HeadlessTabGroup>
</template>
