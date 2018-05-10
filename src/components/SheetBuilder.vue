<template>
    <div>
        <!-- v-on:change="processSheetChange" -->
        <form >
            <label>Character Name</label>
            <input type="text" @change="setName($event.target.value)" :value="name"/>
            <label>Max CR</label>
            <input type="text" @change="setMaxCr($event.target.value)" :value="maxCr" />
            <label>Wild Shape Duration</label>
            <input type="text" @change="setDuration($event.target.value)" :value="duration" />
            <label>Can Fly</label>
            <input type="checkbox" @change="setCanFly($event.target.checked)" :checked="canFly" />
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
    duration: "sheetDataDuration",
    canFly: "sheetDataCanFly",
  }),
  methods: mapActions([
      "setName",
      "setMaxCr",
      "setDuration",
      "setCanFly",
    ]),
};
</script>


<style scoped>

</style>
