import axios from 'axios';

const state = {
    token: '',
    status: '',
    error: ''
  }
  const getters = {
    user: state => state.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  }

  const actions = {
    //fetch userdata from database (based on client-token)
      async login({commit}, object){
          try {
            commit('setStatus', 'loading')
            const user = await axios({
                method: 'post',
                url: 'http://localhost:3456/login',
                data: {
                  username: object.username,
                  password: object.password
                },
                withCredentials: true
              });
            commit('setToken', user)
          } catch (error) {
             errorHandling(error) 
          }
        },
  };

  const mutations = {
    setStatus: (state, status) => (state.status = status),
    setToken: (state, token) => (state.token = token),
    setError: (state, error) => (state.error = error)
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