<template>
    <div class="dashboard">
        <h1 class="subtitle-1 grey--text">Dashboard</h1>

        <v-container >
            <v-row class="mb-3">
                <span class="subtitle-1 grey--text">Sort by:</span>
                
                <v-btn small text class="mx-2" @click="sortBy('title')">
                    <v-icon left small>mdi-folder</v-icon>
                    <span class="caption text-lowercase  grey--text">Project</span>
                </v-btn>
                <v-btn small text class="mr-2" @click="sortBy('person')">
                    <v-icon left small>mdi-account</v-icon>
                    <span class="caption text-lowercase grey--text">Person</span>
                </v-btn>
                <v-col cols="8" class="text-right">
                    <v-btn @click="previewMenu()" color="warning" small dark>Förhandsvisa</v-btn>
                    <v-btn @click="pushToDashboard()" class="mx-2 text-end" small color="success">
                    Lägg till
                    </v-btn>
                </v-col>
                <v-col class="pb-0" cols="6" sm="6" md="4">
                    <input type="text" id="fname" name="firstname" placeholder="Your name..">
                  </v-col>
            </v-row>
                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="dish in menu" :key="dish._id" wrap :class="`pa-1 my-2 dish-${dish.status}`" accordion>
                        <v-expansion-panel-header accordion >
                                <v-flex xs12 sm12 md3>
                                    <div class="caption grey--text">namn</div>
                                    <div>{{dish.name}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md2>
                                    <div class="caption grey--text">pris</div>
                                    <div>{{dish.price}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md2>
                                    <div class="caption grey--text">senast uppdaterad</div>
                                    <div>{{dish.lastUpdated}}</div>
                                </v-flex >
                                <v-flex xs6 sm4 md4 class="justify-center text-end">
                                    <v-btn @click="editDish(dish)" small class="ma-2">edit</v-btn>
                                    <v-btn @click.stop="deleteD(dish._id)" small color="red" class="ma-2 white--text">delete</v-btn>
                                </v-flex>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                            <v-row class="text-left justify-left align-center vert-center pa-0">
                                <v-col>
                                    <div v-if="dish.description" class="caption grey--text my-2">beskrivning</div>
                                    <div v-if="dish.description" class="mb-2">{{dish.description}}</div>
                                </v-col>
                                <v-col>
                                    <div class="caption grey--text my-2 ml-2">ingredienser</div>
                                    <v-chip
                                    v-for="(ing, index) in dish.ingredients" :key="index" 
                                    color="light-grey ma-0"
                                    class="mx-1 black--text justify-start"
                                    label
                                    small
                                    >
                                    {{ ing }}
                                    </v-chip>
                                    </v-col>
                            </v-row> 
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>



                
                <v-dialog v-model="dialog" v-on:change="log()" max-width="500">
                            <v-alert v-if="error" max-width="500" class="ma-0" type="error">
                                <v-row >
                                    <v-col>
                                        {{error}}
                                    </v-col>
                                    <v-col class="text-right">
                                        <v-btn icon dark @click="dialog = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-alert>

                </v-dialog>
        </v-container>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
export default {
    data(){
        return{ 
            projects: [
        { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Find a proper way to view projects', person: 'Albert Einstein', due: '4th Sep 2020', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Achivie ', person: 'Barcardi Jones', due: '20th Feb 2020', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'}
        ],
        order:true,
        acc:[],
        dialog: false,
        namn: false,
        }
    },
    watch: {
        dialog (val) {
        !val && this.addError(null)
        }
    },
    computed: {
        ...mapGetters(['menu', 'error']),
    },
    created: async function () {
        await this.fetchMenu()
        this.menu.forEach((dish, i) => {
            let date = dish.lastUpdated
            let status = this.checkDate(date)
            this.menu[i].status = status
            console.log(mapGetters(['menu', 'error']))
        });
        console.log()
    },
    methods: {
        ...mapMutations(["setDish", 'addError']),
        ...mapActions(["fetchMenu", "deleteDish"]),
        sortBy(){
            this.dialog = true
        },
        accordion(key){
             this.acc.splice(key, 1, !this.acc[key]);
        },
        pushToDashboard(){
            this.$router.push({ name: 'addProject' })
        },
        editDish(dish){
            this.pushToDashboard()
            this.setDish(dish)
        },
        async deleteD(id){
            await this.deleteDish(id)
            if(this.error){
                this.dialog = true
            }
        },
        previewMenu(){
            this.$router.push({ name: 'preview' })
        },
        checkDate(dishDate){
            let date = Date.now()
            let oneMinute = 60 * 1000
            let threeMinutes = 3 * 60 * 1000
            if(dishDate + threeMinutes < date){
                return 'old'

            } else if (dishDate + oneMinute < date){
                return 'warning'
            } else{
                return 'updated'
            }
        }
    }
}
</script>

<style>

    .v-expansion-panel-content__wrap{
        padding-bottom: 0;
    }
    .indigo{
        margin: 3px;
    }
    .vert-center{
        display: flex;
        align-items: center;
    }
    .dish-updated {
        border-left: 5px solid #1ef002;
    }
    .dish-warning {
        border-left: 5px solid orange;
    }
    .dish-old {
        border-left: 5px solid tomato;
    }
    #fname{
        border: none;
        border-image: none;
        margin-bottom: 0;
    }
    #fname:after{
        content: none;
    }
    *:focus {
    outline: none !important;
    }
</style>