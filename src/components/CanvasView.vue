<template>
    <div>
        <p class="button-container">
            <button type="button" class="pure-button" @click="downloadPdf">Download PDF</button>
            <button type="button" class="pure-button" @click="downloadImage">Download High-Res Image</button>
        </p>
        <canvas class="pure-img" width="850px" height="1100px"  v-generate-image="sheetData" ref="canvasEl"></canvas>
        <canvas style="display: none;" width="2550px" height="3300px" ref="canvasLrgEl"></canvas>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import { draw } from '../lib/druidWildShape';
export default {
    name: 'CanvasView',
    computed: {
        ...mapGetters({
            sheetData: 'sheetData'
        })
    },
    directives: {
        generateImage: function(canvasEl, context) {
            context.value;
            var ctx = canvasEl.getContext('2d');
            let contextValue = context.value;

            let sheetData = {
                name: contextValue.name,
                maxCr: contextValue.maxCr,
                duration: contextValue.duration,
                canFly: contextValue.canFly,
                canSwim: contextValue.canSwim,
                creatures: contextValue.creatures
            };

            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
                draw(ctx, sheetData);
            };
            image.src = process.env.NODE_ENV === 'production' ? '/dnd-druid-wildshape-worksheet/sheet-sm.png' : '/sheet-sm.png';
        }
    },
    methods: {
        downloadPdf: function() {
            var doc = new jsPDF({
                orientation: 'p',
                format: 'letter'
            });

            doc.addImage(this.$refs.canvasEl, 'png', -5, -6);

            doc.save('wildshape.pdf');
        },
        downloadImage: function() {
            let ctx = this.$refs.canvasLrgEl.getContext('2d');
            let sheetData = {
                name: this.sheetData.name,
                maxCr: this.sheetData.maxCr,
                duration: this.sheetData.duration,
                canFly: this.sheetData.canFly,
                canSwim: this.sheetData.canSwim,
                creatures: this.sheetData.creatures
            };

            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
                draw(ctx, sheetData, 3);
                window.open(this.$refs.canvasLrgEl.toDataURL());
            };
            image.src = process.env.NODE_ENV === 'production' ? '/dnd-druid-wildshape-worksheet/sheet.png' : '/sheet.png';
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-container {
    text-align: center;
}
.button-container button {
    margin-left: 1em;
    margin-right: 1em;
}
</style>
