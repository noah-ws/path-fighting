<template>
  <div class="container">
    <EntityEditorPanel />
    <EntitySelectorPanel />
  </div>
</template>

<script>
import EntityEditorPanel from './components/EntityEditorPanel.vue'
import EntitySelectorPanel from './components/EntitySelectorPanel.vue'

export default {
  name: 'App',
  components: {
    EntityEditorPanel,
    EntitySelectorPanel
  }
}
</script>

<style>
html,
body
{
    /* height: 100vh; */
    font-family: 'Poppins';
}
</style>
