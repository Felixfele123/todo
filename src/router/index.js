import Vue from 'vue'
import Team from '@/views/Team'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects'
import Dashboard from '@/views/Dashboard'
import addProject from '@/views/addProject'
import preview from '@/views/preview'
import login from '@/views/login'
import axios from 'axios'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'team',
    component: Team,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/addProject',
    name: 'addProject',
    component: addProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/login',
    name: 'login',
    component: login
  },
  {
    path:'/preview',
    name: 'preview',
    component: preview,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach(async (to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3456/secret/',
      withCredentials: true
  })
    if(response.data.uid){
      next()
    }else {
      next({ name: 'login' })
    }
  }else{
    next()
  }
})

export default router

