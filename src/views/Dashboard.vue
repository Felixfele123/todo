<template>
    <div class="dashboard">
        <h1 class="subtitle-1 grey--text">Dashboard</h1>

        <v-container >
            <v-layout row class="mb-3">
                <span class="subtitle-1 grey--text">Sort by:</span>
                
                <v-btn small text class="mx-2" @click="sortBy('title')">
                    <v-icon left small>mdi-folder</v-icon>
                    <span class="caption text-lowercase  grey--text">Project</span>
                </v-btn>
                <v-btn small text class="mr-2" @click="sortBy('person')">
                    <v-icon left small>mdi-account</v-icon>
                    <span class="caption text-lowercase grey--text">Person</span>
                </v-btn>
            </v-layout>

                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="project in projects" :key="project.title" wrap :class="`pa-1 my-2 project ${project.status}`" accordion>
                        <v-expansion-panel-header accordion >
                                <v-flex xs12 md4>
                                    <div class="caption grey--text">Project title</div>
                                    <div>{{project.title}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md2>
                                    <div class="caption grey--text">Person</div>
                                    <div>{{project.person}}</div>
                                </v-flex>
                                <v-flex xs6 sm4 md2>
                                    <div class="caption grey--text">due bye</div>
                                    <div>{{project.due}}</div>
                                </v-flex>
                                <v-flex xs2 sm4 md2>
                                <div class="center mr-2">
                                    <v-chip small :class="project.status">{{ project.status }}</v-chip>
                                </div>
                                </v-flex>
                        </v-expansion-panel-header>
                        
                        <v-expansion-panel-content class="grey--text">
                            <div class="font-weight-bold">due by {{project.due}}</div>
                            <div>{{project.content}}</div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
        <!--
            <v-expansion-panels accordion class="my-5" v-for="(project,index) in projects" :key="project.title">
                <v-layout row wrap :class="`pa-3 project ${project.status}`">
                    <v-flex xs12 md4>
                        <div class="caption grey--text">Project title</div>
                        <div>{{project.title}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Person</div>
                        <div>{{project.person}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">due bye</div>
                        <div>{{project.due}}</div>
                    </v-flex>
                    <v-flex xs2 sm4 md2>
                            <v-btn text small @click="accordion(index)" class="center mt-2">
                                <v-icon>mdi-menu-down</v-icon>
                                <span>info</span>
                            </v-btn>
                    </v-flex>
                    <v-flex xs2 sm4 md2>
                        <div class="center mr-2">
                            <v-chip small :class="project.status">{{ project.status }}</v-chip>
                        </div>
                    </v-flex>
                    <v-flex md12 mt-3 v-if="acc[index]">
                        <div class="caption grey--text">Description</div>
                        <div>{{project.content}}</div>
                    </v-flex>

                </v-layout>
            </v-expansion-panels>
            -->
        </v-container>
    </div>
</template>

<script>
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
        acc:[]
        
        }
      
    },
        computed: {
        myProjects(){
            return this.projects.filter(project=> { return project.person === 'The Net Ninja'})
        }
    },
    methods: {
        sortBy(prop){
            this.order = !this.order;
            let d = "";
            this.order ? d = -1 : d = 1;
            this.projects.sort((a,b) => a[prop] < b[prop] ? d : -d)
        },
        accordion(key){
            window.console.log(key);
             this.acc.splice(key, 1, !this.acc[key]);
         
            window.console.log(this.acc[key]);
        }
    }
}
</script>

<style>

    .indigo{
        margin: 3px;
    }

    .project.complete {
        border-left: 5px solid #1ef002;
    }
    .project.ongoing {
        border-left: 5px solid orange;
    }
    .project.overdue {
        border-left: 5px solid tomato;
    }
   
</style>