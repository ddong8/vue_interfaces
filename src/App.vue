<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // head() {
  //       return {
  //           meta: [
  //               { hid: 'description', 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests'}
  //           ]
  //       }
  //   },
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
