<template>
    <div id="app">
        <SheetBuilder />
        <CanvasView />
    </div>
</template>

<script>
import CanvasView from './components/CanvasView.vue';
import SheetBuilder from './components/SheetBuilder.vue';
import 'purecss/build/pure-min.css';

export default {
    name: 'app',
    components: {
        SheetBuilder,
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
