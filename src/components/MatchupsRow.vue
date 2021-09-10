<template>
    <tr class="matchup-row">
        <td>
            <label class="row-label">{{ rowLabel }}</label>
        </td>
        <td>
            <input class="matchup-predator" type="checkbox">
        </td>
        <td>
            <input class="matchup-prey" type="checkbox">
        </td>
        <td class="row-prey"></td>
    </tr>
</template>

<script>
export default {
  name: "MatchupsRow",
  props: {
      rowLabel: String,
  },
};

</script>

<style scope>

</style>