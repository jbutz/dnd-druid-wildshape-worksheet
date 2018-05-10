<template>
    <div>
        <form v-on:change="processSheetChange">
            <label>Character Name</label>
            <input type="text" v-model="name" />
            <label>Max CR</label>
            <input type="text" v-model="maxCr" />
        </form>
    </div>
</template>

<script>
export default {
    name: "SheetBuilder",
    data: () => ({
        name: null,
        maxCr: null,
    }),
    methods: {
        processSheetChange: function() {
            this.$emit('sheet-change', {
                name: this.name,
                maxCr: this.maxCr,
            });
        }
    }
};
</script>


<style scoped>

</style>
