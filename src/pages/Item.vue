<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../store/cartStore'

const cart = useCartStore()
const route = useRoute()
const tour = ref(null)
const countryName = ref('')

const isInCart = computed(() => cart.items.some(i => i.id === tour.value?.id))

onMounted(async () => {
  const id = route.params.id
  const itemRes = await axios.get(`http://localhost:3000/items/${id}`)
  const countriesRes = await axios.get(`http://localhost:3000/countries`)
  tour.value = itemRes.data
  countryName.value = countriesRes.data.find(c => c.id === tour.value.countryId)?.title || ''
})

function addToCart() {
  cart.addItem(tour.value)
}

function removeFromCart() {
  cart.removeItem(tour.value.id)
}
</script>


<template>
  <section v-if="tour" class="site-main mb-5">
    <div class="container">
      <div class="card text-center card-product">
        <div class="card-product__img">
          <img class="card-img" :src="'/images/' + tour.image" :alt="tour.title" />
        </div>
        <div class="card-body">
          <p>{{ countryName }}</p>
          <h4 class="card-product__title">{{ tour.title }}</h4>
          <p class="card-product__price">{{ tour.price.toLocaleString() }} руб</p>
          <p class="card-product__duration">
            <b>Длительность:</b>
            {{ tour.duration }} дней / {{ tour.duration - 1 }} ночей
          </p>
          <div class="card-product__description" v-html="tour.description"></div>
          <p>
            <button
                v-if="!isInCart"
                type="button"
                class="btn btn-primary"
                @click="addToCart"
            >
              Заказать
            </button>
            <button
                v-else
                type="button"
                class="btn btn-danger"
                @click="removeFromCart"
            >
              Отмена
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

