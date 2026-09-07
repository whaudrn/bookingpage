import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/Booking.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/booking', name: 'booking', component: Booking },
  ]
})

export default router