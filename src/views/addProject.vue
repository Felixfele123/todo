<template>
    <div class="container">
        <h1 class="subtitle-1 grey--text">Add new project</h1>

        <v-form v-model="valid">
    <v-container>
           <input type="text" placeholder="Title">
           <input type="text" placeholder="Description">
    </v-container>
  </v-form>

    </div>

    

</template>

<script>
  export default {
    data: () => ({
    }),
  }
</script>
<style>

input:focus{
  border-color: rgb(255, 138, 43);
}

</style>
