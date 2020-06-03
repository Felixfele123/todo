<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Team</h1>

    <v-container class="my-5">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-6">
            <v-responsive class="pt-10">
              <v-avatar size="90">
                <img :src="person.avatar" alt="image" srcset="">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.title }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn small>
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: 'The Net Ninja', role: 'Web developer', avatar: '/avatar-1.png'  },
        { name: 'Ryu', role: 'Graphic designer', avatar: '/avatar-2.png' },
        { name: 'Chun Li', role: 'Web developer', avatar: '/avatar-3.png' },
        { name: 'Gouken', role: 'Social media maverick', avatar: '/avatar-4.png' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/avatar-5.png'},
        { name: 'Lion', role: 'King of jungle', avatar: '/lejon.jpg'}
      ]
    }
  }
}
</script>