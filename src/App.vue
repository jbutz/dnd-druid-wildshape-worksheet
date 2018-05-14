<template>
    <div id="app">
        <SheetBuilder />
        <CanvasView />
        <footer>
            <span>Credit for the amazing Druid Wild Shape Sheet belongs to glumlord (Joshua Fredrickson) and it is used with permission.
                The sheet is posted and available for download on
                <a href="https://www.reddit.com/r/dndnext/comments/35vtyv/druid_wildshape_reference_sheet_is_there_a/" target="_blank">Reddit</a>
                and on <a href="http://www.enworld.org/forum/rpgdownloads.php?do=download&downloadid=1266" target="_blank">EN World</a>.
            </span><br />
            <span>Creature information is from the 5e SRD and is licensed under OGL v1.0a.
                The specific copy of the information is pulled from <a href="https://5thsrd.org/" target="_blank">5thsrd.org</a>.
            </span><br />
            <span><a href="https://github.com/jbutz/dnd-druid-wildshape-worksheet" target="_blank">View the source code on GitHub</a></span><br />
            <span>Built by <a href="https://jasonbutz.info" target="_blank">Jason Butz</a></span>
        </footer>
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
