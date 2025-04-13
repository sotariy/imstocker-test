import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Item from '../pages/Item.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/item/:id', component: Item }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
