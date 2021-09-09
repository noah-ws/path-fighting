<template>
    <div class="selector-item-container">
        <div class="selector-color">
            <div class="selector-indicator"></div>
        </div>
        <FlexSpacer flex="0.5"/>
        <div class="selector-item-label">{{ name }}</div>
    </div>
</template>

<script>
import FlexSpacer from './FlexSpacer.vue';

export default {
  name: "EntitySelectorItem",
  components: {
      FlexSpacer,
  },
  props: {
      name: String,
  },
};
</script>

<style scope>
.selector-item-container
{
    display: flex;
    width: 8.5%;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    height: 9vh;
}

.selector-item-row
{
    display: flex;
    width: 85%;
    align-items: center;
    flex: 1;
    z-index: 1;
}

.selector-indicator
{
    position: relative;
    width: 0.75vw;
    height: 0.75vw;
    background-color: rgb(173, 173, 173);
    border: solid 3px rgb(173, 173, 173);
    margin-top: -12.5%;
    margin-left: -12.5%;
    border-radius: 50%;
    z-index: 1;
    flex: 0.75;
    z-index: 1;
}

.selector-color
{
    height: 3vw;
    width: 3vw;
    /* max-width: 4vw; */
    /* position: relative; */
    z-index: 1;
    background-color: rgb(255, 2, 2);
    flex: 4;
    z-index: 1;
}

.selector-item-label
{
    width: 90%;
    height: 30%;
    font-size: 1.75vh;
    background-color: rgb(173, 173, 173);
    border-radius: 10px;
    /* margin-left: %; */
    flex: 1;
    text-align: center;
    z-index: 1;
}
</style>