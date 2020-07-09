<template>
  <v-app class="grey lighten-4">
    <Navbar v-if="this.$route.path !== '/login'"/>
    <previewTools v-if="this.$route.path == '/preview'"/>
      <v-content v-if="this.$route.path !== '/login'" class="mx-4">
        <router-view></router-view>
      </v-content>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import previewTools from './components/previewTools'
export default {
  components: { Navbar, previewTools },
  name: 'App',
  data () {
    return {
      drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
    }
  }
}
</script>
<style>
</style>
