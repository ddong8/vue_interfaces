<template>
  <div>
    <!-- Pass the root data to the SmilesDisplay component -->
    <!-- <div class="df">
      <SmilesDisplay :data="rootData" />
    </div> -->
    <div class="treeChart">
      <TreeChart></TreeChart>
    </div>
  </div>
</template>

<script>
import SmilesDisplay from './components/SmilesDisplay'
import TreeChart from './components/TreeChart'

export default {
  name: "App",
  components: {
    SmilesDisplay,
    TreeChart
  },

};
</script>

<style scoped>
.treeChart {
  width: 100%;
  height: 600px;
}
</style>

