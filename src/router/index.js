import Vue from 'vue'
import Team from '@/views/Team'
import VueRouter from 'vue-router'
import Projects from '@/views/Projects'
import Dashboard from '@/views/Dashboard'
import addProject from '@/views/addProject'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path:'/addProject',
    name: 'addProject',
    component: addProject
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
