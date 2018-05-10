<template>
    <div id="app">
        <SheetBuilder v-on:sheet-change="onSheetChange"/>
        <CanvasView
            v-bind:name="sheetData.name"
            v-bind:maxCr="sheetData.maxCr"
            v-bind:creatures="sheetData.creatures"
        />
    </div>
</template>

<script>
import CanvasView from "./components/CanvasView.vue";
import SheetBuilder from "./components/SheetBuilder.vue";

export default {
  name: "app",
  components: {
    SheetBuilder,
    CanvasView
  },
  data: () => ({
      sheetData: {}
  }),
  methods: {
      onSheetChange: function(sheetData) {
          this.sheetData = sheetData;
      }
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
