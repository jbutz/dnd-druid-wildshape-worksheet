<template>
    <div>
        <canvas width="850px" height="1100px"  v-generate-image="creatures"></canvas>
    </div>
</template>

<script>
import {draw} from '../lib/druidWildShape';
export default {
  name: "CanvasView",
  props: {
    creatures: Array
  },
  directives: {
    generateImage: function(canvasEl, context) {
      var ctx = canvasEl.getContext("2d");
      console.log(context, context.value);

      let image = new Image();
      image.onload = () => {
          ctx.drawImage(image, 0, 0);
            draw(ctx, {
                name: 'Test Name',
                maxCr: '1/4',
                duration: '1 hr',
                canFly: true,
                canSwim: true,
                creatures: [
                    {
                        name: '|',
                        size: '|',
                        speed: '|',
                        hitDice: '|',
                        str: '18',
                        dex: '18',
                        con: '18',
                        cr: '1',
                        hp: '200',
                        ac: '18',
                        details: [
                            "Keen Hearing and Smell. The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
                            "Pack Tactics. The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.",
                            "Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone. "
                        ],
                    },
                    {
                        name: '|',
                        size: '|',
                        speed: '|',
                        hitDice: '|',
                        str: '18',
                        dex: '18',
                        con: '18',
                        cr: '1',
                        hp: '200',
                        ac: '18',
                        details: [],
                    },
                    {
                        name: '|',
                        size: '|',
                        speed: '|',
                        hitDice: '|',
                        str: '18',
                        dex: '18',
                        con: '18',
                        cr: '1',
                        hp: '200',
                        ac: '18',
                        details: [],
                    },
                ]
            });
      };
      image.src = '/sheet-sm.png';


      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
