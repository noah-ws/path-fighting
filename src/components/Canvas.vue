<template>
    <div class="canvas-container" id="canvas-container">
        <canvas class="webgl" id="webgl"></canvas>
    </div>
</template>

<script>
export default {
  name: "Canvas",
  components: {
  },
  props: {
  },
};
</script>

<style scope>
.canvas-container
{
    position: relative;
    width: 200;
    height: 200;
}

.webgl
{
    position: absolute;
}
</style>