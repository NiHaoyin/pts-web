import Vue from 'vue'
import VueRouter from 'vue-router'
import PlaceOrder from '../components/PlaceOrder.vue'
import Login from '../components/Login.vue'

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
    path: "/placeorder",
    component: PlaceOrder
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
