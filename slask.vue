<h1 class="title grey--text">Lägg till ny pizza, sallad eller meny</h1>
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

    <v-radio-group :disabled="radioDisabled" class="justify-center" v-model="prisklass">
      <v-radio label="75/180"  value="1"></v-radio>
      <v-radio label="80/190" value="2"></v-radio>
      <v-radio label="85/200" value="3"></v-radio>
      <v-radio label="90/210" value="4"></v-radio>
    </v-radio-group>
      <input type="text" :disabled="!radioDisabled" placeholder="Anpassat pris" v-model="anpassatPris">
  </v-col>
  <v-col cols="5" class="">
    <h1 class="subtitle-1 grey--text text-left">info</h1>
    <input type="text" placeholder="Namn" v-model="namn">
    <input @keydown.enter.prevent="addIng" type="text" placeholder="Ingredienser" v-model="another">   
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
      <v-col cols="12" class="d-flex align-end justify-end">
        <v-btn @click="clearForm()" class="ma-2 text-end" outlined color="black">Rensa</v-btn>
        <v-btn class="ma-2" color="success">
        Lägg till
        </v-btn>
      </v-col>
  </v-col>
</v-row>