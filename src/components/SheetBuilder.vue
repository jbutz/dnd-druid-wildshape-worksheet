<template>
    <div id="form-container">
        <form class="pure-form pure-form-stacked">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-3">
                    <label for="name">Character Name</label>
                    <input type="text" name="name" v-model="name"/>
                </div>

                <div class="pure-u-1 pure-u-md-1-3">
                    <label for="maxCr">Max CR</label>
                    <input type="text" name="maxCr" class="pure-input-1-3" v-model="maxCr" />
                </div>

                <div class="pure-u-1 pure-u-md-1-3">
                    <label for="duration">Wild Shape Duration</label>
                    <input type="text" name="duration" class="pure-input-1-3" v-model="duration" />
                </div>
                
                <div class="pure-u-1 pure-u-md-1-3">
                    <label class="pure-checkbox">
                        <input type="checkbox" name="canSwim" v-model="canSwim" />
                        Can Swim
                    </label>
                </div>

                <div class="pure-u-1 pure-u-md-1-3">
                    <label class="pure-checkbox">
                        <input type="checkbox" name="canFly" v-model="canFly" />
                        Can Fly
                    </label>
                </div>
            </div>
            <div>
                <fieldset>
                    <legend>Creatures</legend>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature0">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature1">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature2">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature3">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature4">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature5">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature6">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature7">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                    <div class="pure-control-group">
                        <select class="pure-input-1" v-model="creature8">
                            <option v-for="beast in BEAST_OPTIONS" v-bind:value="beast.value" :key="beast.value">
                                {{ beast.label }}
                            </option>
                        </select>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getBeasts } from '../lib/beastResolver';

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
        ...(() => {
            let creatureGetterSetters = {};

            for (let i = 0; i < 9; i++) {
                creatureGetterSetters[`creature${i}`] = {
                    get() {
                        return this.sheetData.creatures[i]
                            ? this.sheetData.creatures[i].name
                            : null;
                    },
                    set(value) {
                        this.setCreature([value, i]);
                    }
                };
            }

            return creatureGetterSetters;
        })(),
    },
    methods: mapActions([
        'setName',
        'setMaxCr',
        'setDuration',
        'setCanFly',
        'setCanSwim',
        'setCreature'
    ]),
    data: function() {
        return {
            BEAST_OPTIONS: [''].concat(getBeasts())
        };
    }
};
</script>


<style scoped>
#form-container {
    padding-right: 2em;
    padding-left: 2em;
}
</style>
