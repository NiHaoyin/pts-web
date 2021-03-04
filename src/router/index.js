import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/Order.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'

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

    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
