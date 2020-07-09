<template >
    <v-card @click.stop="mini = !mini">
      <v-navigation-drawer
        :mini-variant="mini"
        permanent
        text app
        right
        class="text-center"
      >
      <v-icon>mdi-cog-outline</v-icon>
      <v-divider></v-divider>
        <v-list>
          <v-list-item
            @click.stop="mini = !mini"
            v-for="item in items"
            :key="item.title"
            link
            class="justify-right"
            >
            <v-row>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>                
            </v-row>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </template>
  <script>
    export default {
      data () {
        return {
          items: [
            { icon: 'mdi-format-text-variant' },
            { icon: 'mdi-palette' },
            { icon: 'mdi-account-group-outline' },
          ],
          mini: true
        }
      },
    }
  </script>
  <style>
      .toolbar{
        display: inline;
      }
  </style>