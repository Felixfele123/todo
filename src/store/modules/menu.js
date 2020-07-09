import axios from 'axios';

const state = {
    menu: [],
    dish: null,
    error: null,
    dishSuccess: null,
  };

  const getters = {
    menu: state => state.menu,
    error: state => state.error,
    dishSuccess: state => state.dishSuccess,
    dish: state => state.dish
  };

  const actions = {
    //fetch userdata from database (based on client-token)
      async fetchMenu({commit, rootState}){
        console.log(rootState)
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3456/menu',
            withCredentials: true
          });
          commit('setMenu', response.data);
    },
      async postDish({commit}, object){
        try {
          await axios({
            method: 'post',
            url: 'http://localhost:3456/menu',
            data: {
              ingredients: object.ingredients,
              name: object.name,
              type: object.type,
              price: object.price,
              description: object.description,
              uid: object.userID
            },
          })
          commit('addDishSuccess', "Added dish successfully");
        } catch (error) {
          let errorMes = errorHandling(error)
          commit('addError', errorMes);          
        }
    },
    async updateDish({commit},object){
      try {
        await axios({
          method: 'put',
          url: 'http://localhost:3456/menu/' + object._id,
          data: {
            ingredients: object.ingredients,
            name: object.name,
            type: object.type,
            price: object.price,
            description: object.description,
            userID: object.userID
          },
      })
      commit('addDishSuccess', "Changed dish successfully");
      commit('setDish', object);
      } catch (error) {
          let errorMes = errorHandling(error)
          commit('addError', errorMes);          
        }
    },
      async deleteDish({commit}, id){
        try {
            await axios({
              method: 'delete',
              url: 'http://localhost:3456/menu/' + id,
          })
          commit('removeDish', id)
        }  catch (error) {

        let errorMes = errorHandling(error)
        commit('addError', errorMes);
      }

      }
  };

  const mutations = {
    setMenu: (state, menu) => (state.menu = menu),
    addDish: (state, object) => state.menu = state.menu.push(object),
    removeDish: (state, id) => state.menu = state.menu.filter(dish => dish._id !== id),
    addError: (state, error) => (state.error = error),
    addDishSuccess: (state, dishSuccess) => (state.dishSuccess = dishSuccess),
    setDish: (state, dish) => (state.dish = dish),
    resetDish: (state, dish) => (state.dish = dish),
    updateDish: (state, updDish) => {
      const index = state.menu.findIndex(dish => dish._id === updDish._id);
      if (index !== -1) {
        state.menu.splice(index, 1, updDish);
      }
    }
  }
 
  export default {
    state,
    getters,
    actions,
    mutations
}

function errorHandling(error){
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
          return error.response.data
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return error.request
        } else {
          // Something happened in setting up the request that triggered an Error
          return error.message
        }
        //commit('addError', error); 
}

