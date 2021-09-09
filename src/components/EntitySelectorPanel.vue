<template>
    <div class="entity-selector" id="entity-selector">
        <EntitySelectorItem name="Hi"/>
        <EntitySelectorItem name="testingtesting"/>
        <EntitySelectorItem name="testingtesting"/>
        <EntitySelectorItem name="testingtesting"/>
        <EntitySelectorItem name="testingtesting"/>
        <EntitySelectorItem name="testingtesting"/>
    </div>
</template>

<script>
import EntitySelectorItem from './EntitySelectorItem.vue';

export default {
  name: "EntityEditorPanel",
  components: {
      EntitySelectorItem,
  },
  props: {
  },
};
</script>

<style scope>
.entity-selector
{
    height: 10vh;
    width: 82.5vw;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-left: 16%;
    margin-top: 0.5%;
    background-color: #111;
    overflow-y: hidden;
    border-radius: 10px;
    opacity: 0.9;
    padding-top: 0.75%;
    padding-left: 0.85%;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
}
</style>