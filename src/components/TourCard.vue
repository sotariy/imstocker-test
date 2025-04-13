<script setup>
import { useCartStore } from '../store/cartStore'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const props = defineProps({ item: Object })
const cart = useCartStore()
const countryTitle = ref('')

const isInCart = computed(() => cart.items.some(i => i.id === props.item.id))

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/countries/${props.item.countryId}`)
  countryTitle.value = res.data.title
})

function addToCart() {
  cart.addItem(props.item)
}

function removeFromCart() {
  cart.removeItem(props.item.id)
}
</script>


<template>
  <div>
    <div class="card text-center card-product">
      <div class="card-product__img">
        <img class="card-img" :src="'/images/' + item.image" :alt="item.title" />
      </div>
      <div class="card-body">
        <p>{{ countryTitle }}</p>
        <h4 class="card-product__title">
          <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
        </h4>
        <p class="card-product__price">{{ item.price.toLocaleString() }} руб</p>
        <p>
          <button
              v-if="!isInCart"
              class="btn btn-primary"
              @click="addToCart"
          >
            Заказать
          </button>
          <button
              v-else
              class="btn btn-danger"
              @click="removeFromCart"
          >
            Отмена
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

