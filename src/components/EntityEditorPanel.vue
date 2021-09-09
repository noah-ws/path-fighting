<template>
    <div class="sidenav" id="sidenav">
        <div class="sidenav-header" id="sidenav-header">
            <div class="sidenav-header-text">Path Fighting</div>
            <!-- TODO: button component <button class="sidenav-header-minimize" id="sidenav-header-minimize"></button> -->
        </div>
        <EntityEditorItem />
        <EntityEditorItem />
    </div>
</template>

<script>
import EntityEditorItem from './EntityEditorItem.vue';

export default {
  components: { EntityEditorItem },
  name: "EntityEditorPanel",
  props: {
  },
};
</script>

<style scope>
.sidenav {
    margin-left: 0.5%;
    margin-top: 0.5%;
    height: 98vh;
    width: 15vw;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    border-radius: 25px;
    opacity: 0.9;
}

.sidenav-header
{
    width: 100%;
    height: 5%;
    background-color: #818181;
    display: flex;
    /* position: sticky; */
    flex-wrap: nowrap;
}

.sidenav-header
{
    width: 100%;
    height: 5%;
    background-color: #818181;
    display: flex;
    /* position: sticky; */
    flex-wrap: nowrap;
}

.sidenav-header-text
{
    padding-top: 2%;
    padding-left: 10%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3.5vh;
    font-weight: bold;
    float: left;
    flex: 9;
}
</style>