<template>
    <div class="container" fluid fill-height>
        <h1 v-if="!dish" class="title grey--text">Lägg till ny pizza, sallad eller meny</h1>
        <h1 v-else class="title grey--text">{{dish.name}}</h1>
        <v-row fluid class="justify-center">
          <v-col cols="5" class="mx-5">
            <h1 class="subtitle-1 grey--text">typ</h1>
            <v-radio-group v-on:change="radioCheck()" mandatory class="justify-center text-center " v-model="radios" row>
              <v-row >
                <v-col >
                  <v-radio label="Pizza"  value="pizza"></v-radio>
                </v-col>
                <v-col>
                  <v-radio label="Sallad" value="sallad"></v-radio>
                </v-col>
                <v-col>
                  <v-radio label="Meny" value="meny"></v-radio> 
                </v-col>
              </v-row>
  
            </v-radio-group>
            <h1 class="subtitle-1 grey--text mt-0">Pris</h1>

              <input type="text" placeholder="Anpassat pris" v-model="anpassatPris">
          </v-col>
          <v-col cols="5" class="">
            <h1 class="subtitle-1 grey--text text-left">info</h1>
            <input type="text" placeholder="Namn" v-model="namn">
            <input type="text" placeholder="Beskrivning" v-model="beskrivning">
            <input @keydown.enter.prevent="addIng" type="text" placeholder="Lägg till ingrediens" v-model="another">   
            <v-row class="justify-start text-left full-height d-flex">
                <v-chip
                  v-for="(ing, index) in ingredienser" :key="index" 
                  color="grey"
                  class="mx-3 black--text justify-start"
                  label
                  small
                  @click="deleteIng(ing)"
                >
                  {{ ing }}
                </v-chip>
            </v-row>  
          </v-col>
        </v-row>
          <v-row class="d-flex align-end justify-end space-around">
            <v-btn @click="clearForm()" class="ma-2 text-end" outlined color="black">Rensa</v-btn>
            <v-btn @click="addD()" class="ma-2 " color="success">
            Lägg till
            </v-btn>
          </v-row>
        <v-alert dense v-if="error" type="error">
          {{error}}
        </v-alert>
        <v-alert dense v-if="dishSuccess" type="success">
          <v-row class="ma-0">
            <v-col cols="6">{{dishSuccess}}</v-col>
            <v-col cols="6" class="text-end ">
              <router-link class="white--text" to="/">show menu</router-link>
            </v-col>
          </v-row>
        </v-alert>
    </div>
</template>
<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  export default {
    data(){
        return{
          radios:"pizza",
          another: null,
          ingredienser: ['banan', 'ost', 'skinka', 'majs'],
          anpassatPris: "",
          prisklass: null,
          beskrivning: null,
          namn: null,
          id: null
        }
    },
    destroyed: function() {
      this.resetDish(null)
      this.addDishSuccess(null)
    },
    created: function () {
        if(this.dish){
          this.radios = this.dish.radios
          this.ingredienser = this.dish.ingredients
          this.namn = this.dish.name
          this.id = this.dish._id
          this.anpassatPris = this.dish.price
          this.beskrivning = this.dish.description
        }
    },
    computed: mapGetters(['error', 'dishSuccess', 'dish', 'user']),
    methods: {
      ...mapMutations(["addError", "addDishSuccess", "resetDish"]),
      ...mapActions(["postDish", "updateDish"]),
      addIng(){
        this.ingredienser.push(this.another)
        this.another = ""
      },
      deleteIng(ing) {
            this.ingredienser = this.ingredienser.filter(ingredient => { 
                return ingredient != ing
            })
        },
      clearForm(){
        this.addError(null) 
        this.addDishSuccess(null)
        this.radios = null
        this.ingredienser = []
        this.anpassatPris = ""
        this.prisklass = null
        this.namn = null
      },
      addD(){
        this.addError(null) 
        this.addDishSuccess(null)
        let ingredients = this.ingredienser
        let name = this.namn
        let type = this.radios
        let price = ""
        let beskrivning = this.beskrivning
        let _id = this.id
        if(this.prisklass){
          price = this.prisklass
        }else{
          price = this.anpassatPris
        }
        let object = {
          ingredients: ingredients, 
          name: name, 
          type: type, 
          price: price, 
          description: beskrivning, 
          _id: _id,
          userID: this.user.data.uid         
          }
        if(this.dish){
          this.updateDish(object)
        }else{
          this.postDish(object)
        }
      },
      pushMenu(){
        this.$router.push({ name: 'dashboard' })
      }
      
    }
  }
  
</script>
<style>

input:focus{
  border-color: rgb(255, 138, 43);
}
.field{
  display: flex;
}
.full-height{
  height: 20%;
}

</style>
