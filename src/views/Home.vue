<template>
  <div class="home">
    <h1>Homepage</h1>

    <v-btn class="pink white--text">Click Me</v-btn>
    <v-btn depressed color="pink">Click me!</v-btn>
    <v-btn flat color="pink">Click me</v-btn>
    <v-btn depressed color="pink white--text">
      <v-icon>email</v-icon>
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>
   .pink{
    margin: 5px;
  }
</style>