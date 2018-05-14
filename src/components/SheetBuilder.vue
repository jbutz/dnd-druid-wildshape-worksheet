<template>
    <div id="form-container">
        <!-- v-on:change="processSheetChange" -->
        <form class="pure-form pure-form-aligned">
            <div class="pure-control-group">
                <label>Character Name</label>
                <input type="text" @change="setName($event.target.value)" :value="name"/>
            </div>
            <div class="pure-control-group">
                <label>Max CR</label>
                <input type="text" @change="setMaxCr($event.target.value)" :value="maxCr" />
            </div>
            <div class="pure-control-group">
                <label>Wild Shape Duration</label>
                <input type="text" @change="setDuration($event.target.value)" :value="duration" />
            </div>
            <div class="pure-control-group">
                <label>Can Fly</label>
                <input type="checkbox" @change="setCanFly($event.target.checked)" :checked="canFly" />
            </div>
            <div class="pure-control-group">
                <label>Can Swim</label>
                <input type="checkbox" @change="setCanSwim($event.target.checked)" :checked="canSwim" />
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SheetBuilder',
    computed: mapGetters({
        name: 'sheetDataName',
        maxCr: 'sheetDataMaxCr',
        duration: 'sheetDataDuration',
        canFly: 'sheetDataCanFly',
        canSwim: 'sheetDataCanSwim'
    }),
    methods: mapActions([
        'setName',
        'setMaxCr',
        'setDuration',
        'setCanFly',
        'setCanSwim'
    ])
};
</script>


<style scoped>
#form-container {
  text-align: left;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
