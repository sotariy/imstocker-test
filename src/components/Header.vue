<script setup>
import { useCartStore } from '../store/cartStore'
const cart = useCartStore()
</script>


<template>
  <header class="site-header mb-4">
    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <router-link class="navbar-brand site-header-logo" to="/">Путевки онлайн</router-link>
          <router-link class="btn btn-primary" to="/cart">
            Корзина <span class="badge badge-light">{{ cart.items.length }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

