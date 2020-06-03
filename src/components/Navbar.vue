<template>
  <nav>

    <v-app-bar text app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Savannah</span>
            <span> Dev</span>
          </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
            <v-icon left>mdi-menu-down</v-icon>
            <span>Menu</span>
        </v-btn>
    </template>
    <v-list>

        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
    </v-list>
</v-menu>

      <v-btn text>
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">

<v-layout text-center>
  <v-flex class="mt-5">
    <v-avatar size="100">
      <img src="Apa.jpg" alt="" srcset="">
    </v-avatar>
  </v-flex>
</v-layout>

  <v-layout text-center ma-1>
    <v-flex>
      <v-btn>
        <span>
          <router-link :to="{name:'addProject'}">add project</router-link>
        </span>
      </v-btn>
    </v-flex>
  </v-layout>

    <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>


  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ],
      menu: "menu-down"
    }
  },
  methods:{
    changeMenu(){
      if(this.menu == 'menu-down'){
        this.menu = 'menu-left'
      } else{
        this.menu = 'menu-down'
      }
    }
  }

}
</script>

<style>
canvas{
    position: absolute;
    z-index: -1;
}
</style>
