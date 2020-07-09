<template>
    <div>

        <v-row class="justify-center marginmain">
        <v-col cols="7" class="mx-8">
            <v-card class="font-italic">
                <v-card-title class=" justify-center">
                    <p class="text-center">Menu</p>
                </v-card-title>
                <v-card-title class=" justify-center">
                    <p class="text-center">pizza</p>
                </v-card-title>
                <v-row v-for="pizza in pizzas" :key="pizza._id">
                    <v-col cols="2" class="pa-0 text-right">
                        <v-card-text  class="">1.</v-card-text>
                    </v-col>
                    <v-col cols="4 px-0">
                        <v-card-text>{{pizza.name}}</v-card-text>
                    </v-col >
                    <v-col cols="5" class="text-right">
                        <v-card-text>{{pizza.price}}</v-card-text>
                    </v-col>
                </v-row>
                <v-card-title class=" justify-center">
                    <p class="text-center">meny</p>
                </v-card-title>
                <v-row v-for="menu in menus" :key="menu._id">
                    <v-col cols="2" class="pa-0 text-right">
                        <v-card-text  class="">1.</v-card-text>
                    </v-col>
                    <v-col cols="4 px-0">
                        <v-card-text>{{menu.name}}</v-card-text>
                    </v-col >
                    <v-col cols="5" class="text-right">
                        <v-card-text>{{menu.price}}</v-card-text>
                    </v-col>
                </v-row>
                <v-card-title class=" justify-center">
                    <p class="text-center">sallad</p>
                </v-card-title>
                <v-row v-for="salad in salads" :key="salad._id">
                    <v-col cols="2" class="pa-0 text-right">
                        <v-card-text  class="">1.</v-card-text>
                    </v-col>
                    <v-col cols="4 px-0">
                        <v-card-text>{{salad.name}}</v-card-text>
                    </v-col >
                    <v-col cols="5" class="text-right">
                        <v-card-text>{{salad.price}}</v-card-text>
                    </v-col>
                </v-row>
          </v-card>
        </v-col>       
        <v-col cols="3">
            <div class="sticky">I will stick to the screen when you reach my scroll position</div>
        </v-col>
        </v-row>
    </div>
</template>
  
  <script>
    import {mapGetters} from 'vuex';
    export default {
      computed: {
        ...mapGetters(['menu']),
        pizzas(){return this.menu.filter(pizza => pizza.type === 'pizza')},
        menus(){return this.menu.filter(pizza => pizza.type === 'meny')},
        salads(){return this.menu.filter(pizza => pizza.type === 'sallad')},
      },
      data () {
      return {
        fonts: [
        { name: 'Arial' },
        { name: 'Times New Roman' },
        { name: 'Courier New' },
      ],
      }
    },
    }
  </script>
  <style >
      .full-height{
          height: 500px;
      }
      .sidenav {
        width: 130px;
        position: sticky;
        z-index: 1;
        top: 20px;
        left: 1000px;
        background: #eee;
        overflow-x: hidden;
        padding: 8px 0;
    }

    .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #2196F3;
    display: block;
    }
    .sidenav a:hover {
    color: #064579;
    }
    .sticky{
        position: sticky;
        height: 300 !important;
        padding-top: 40px;
    }
    div.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: yellow;
    padding: 50px;
    font-size: 20px;
    }

  </style>