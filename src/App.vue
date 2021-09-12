<template>
  <div class="container">
    <EntityEditorPanel />
    <EntitySelectorPanel />
    <Canvas />
  </div>
</template>

<script>
import EntityEditorPanel from './components/EntityEditorPanel.vue'
import EntitySelectorPanel from './components/EntitySelectorPanel.vue'
import Canvas from './components/Canvas.vue'

export default {
  name: 'App',
  components: {
    EntityEditorPanel,
    EntitySelectorPanel,
    Canvas,
  }
}
</script>

<style>
html,
body
{
    /* height: 100vh; */
    font-family: 'Poppins';
    margin: 0px;
}
</style>
