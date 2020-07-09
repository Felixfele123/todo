<template>
  <nav>
    <v-app-bar text app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Resturant</span>
            <span>pad</span>
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
      <v-btn text @click="logout()">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="primary">
    <v-row text-center class="mb-0" style="height: 170px;">
      <v-col cols="12" class="mt-5 text-center">
        <v-avatar size="100">
          <img src="Apa.jpg" alt="" srcset="">
        </v-avatar>
      </v-col>
      <v-col cols="12" class="text-center">
        <span>{{user.data.username}}</span>
      </v-col>
    </v-row>
  <v-layout text-center ma-1>
    <v-flex>
      <v-btn>
        <span>
          <router-link :to="{name:'addProject'}">Edit profile</router-link>
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
import axios from 'axios'
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-home', text:'Home', route: '/'},
        { icon: 'mdi-view-dashboard', text: 'Meny', route: '/' },
        { icon: 'mdi-folder', text: 'Galleri', route: '/projects' },
        { icon: 'mdi-account', text: 'Extra', route: '/team' },
      ],
      error: null,
      menu: "menu-down"
    }
  },
  computed: mapGetters(['user']),
  created: () => {
    let vuex = window.sessionStorage.getItem('vuex');
    console.log(vuex.menu)
  },
  methods:{
    changeMenu(){
      if(this.menu == 'menu-down'){
        this.menu = 'menu-left'
      } else{
        this.menu = 'menu-down'
      }
    },
    async logout(){
         try {
            const user = await axios({
                method: 'get',
                url: 'http://localhost:3456/logout',
                withCredentials: true
              });
              console.log(user)
          } catch (error) {
            this.error = error
          }
      this.delete_cookie('token');
      this.$router.push('/login')
    },
    delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
