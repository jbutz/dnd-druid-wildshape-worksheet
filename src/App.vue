<template>
  <div id="app">
    <CanvasView v-bind:creatures="[1,2,3]" />
  </div>
</template>

<script>
import CanvasView from "./components/CanvasView.vue";

export default {
  name: "app",
  components: {
    CanvasView
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
