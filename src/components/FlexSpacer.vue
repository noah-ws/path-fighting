<template>
    <div class="flex-spacer" :style="`flex: ${flex}`"></div>
</template>

<script>

export default {
  name: "FlexSpacer",
  props: {
      flex: String,
  },
};
</script>

<style scope>
</style>