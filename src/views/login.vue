<template>
    <v-app id="inspire" :style="{'background-image':'url(menu.jpg)'}">
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title> ResturantPad</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <span>Source</span>
                  </v-tooltip>
                </v-toolbar>
                    <v-form @submit="checkForm">
                    <v-card-text class="mt-4">
                    <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    class="ma-0 flat"
                    v-model="username"
                    id="input-13"
                    ></v-text-field>
                    <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    class="flat"
                    v-model="password"
                    id="input-14"
                    ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="loginUser()" class="ma-2" outlined color="black">Login</v-btn>
                </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  <script>
    import {mapActions} from 'vuex';
    export default {
      props: {
        source: String,
      },
      data(){
          return {
            username: "",
            password: ""
          }
      },
      methods: {
            ...mapActions(["login"]),
          async loginUser(){
            let object = { username: this.username, password: this.password}
            await this.login(object)
            this.pushToDashboard();
          },
            pushToDashboard(){
                this.$router.push('/')
            },
            checkForm(){
                console.log("check");
            }
      },
    }
  </script>
  <style>
      #input-13,#input-14, #password, input[name="goButton"], .flat{
          margin: 0 !important;
      }

  </style>