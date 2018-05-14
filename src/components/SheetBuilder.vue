<template>
    <div id="form-container">
        <!-- v-on:change="processSheetChange" -->
        <form class="pure-form pure-form-aligned">
            <div class="pure-control-group">
                <label>Character Name</label>
                <input type="text" v-model="name"/>
            </div>
            <div class="pure-control-group">
                <label>Max CR</label>
                <input type="text" v-model="maxCr" />
            </div>
            <div class="pure-control-group">
                <label>Wild Shape Duration</label>
                <input type="text" v-model="duration" />
            </div>
            <div class="pure-control-group">
                <label>Can Fly</label>
                <input type="checkbox" v-model="canFly" />
            </div>
            <div class="pure-control-group">
                <label>Can Swim</label>
                <input type="checkbox" v-model="canSwim" />
            </div>
            <div>
                <fieldset>
                    <legend>Creatures</legend>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature0">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature1">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature2">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature3">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature4">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature5">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature6">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature7">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature8">
                            <option></option>
                            <option value="Dire Wolf">Dire Wolf (CR 1)</option>
                        </select>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'SheetBuilder',
    computed: {
        ...mapGetters(['sheetData']),
        name: {
            get() {
                return this.sheetData.name;
            },
            set(value) {
                this.setName(value);
            }
        },
        maxCr: {
            get() {
                return this.sheetData.maxCr;
            },
            set(value) {
                this.setMaxCr(value);
            }
        },
        duration: {
            get() {
                return this.sheetData.duration;
            },
            set(value) {
                this.setDuration(value);
            }
        },
        canFly: {
            get() {
                return this.sheetData.canFly;
            },
            set(value) {
                this.setCanFly(value);
            }
        },
        canSwim: {
            get() {
                return this.sheetData.canSwim;
            },
            set(value) {
                this.setCanSwim(value);
            }
        },
        ...((() => {
            let creatureGetterSetters = {};

            for(let i = 0; i < 9; i++) {
                creatureGetterSetters[`creature${i}`] = {
                    get() {
                        return this.sheetData.creatures[i] ? this.sheetData.creatures[i].name : null;
                    },
                    set(value) {
                        this.setCreature([value, i]);
                    }
                }
            };

            return creatureGetterSetters;
        })()),
    },
    methods: mapActions([
        'setName',
        'setMaxCr',
        'setDuration',
        'setCanFly',
        'setCanSwim',
        'setCreature',
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
