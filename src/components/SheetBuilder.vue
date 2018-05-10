<template>
    <div>
        <!-- v-on:change="processSheetChange" -->
        <form >
            <label>Character Name</label>
            <input type="text" @change="setName($event.target.value)" :value="name"/>
            <label>Max CR</label>
            <input type="text" @change="setMaxCr($event.target.value)" :value="maxCr" />
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SheetBuilder",
  computed: mapGetters({
    name: "sheetDataName",
    maxCr: "sheetDataMaxCr",
  }),
  methods: mapActions([
      "setName",
      "setMaxCr",
    ]),
};
</script>


<style scoped>

</style>
