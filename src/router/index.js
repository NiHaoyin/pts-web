import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/Order.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import Dashboard from '../components/Dashboard.vue'
import Car from '../components/Car.vue'
import Tray from '../components/Tray.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    // redirect: "/user",
    children: [
      {path: "/user", component: User},
      {path: "/order", component: Order},
      {path: "/dashboard", component: Dashboard},
      {path: "/car", component: Car},
      {path: "/tray", component: Tray},
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
