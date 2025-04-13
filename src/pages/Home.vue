<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import TourCard from '../components/TourCard.vue'
import { useCartStore } from '../store/cartStore'

const items = ref([])
const countries = ref([])
const selectedCountry = ref('0')
const searchQuery = ref('')
const cart = useCartStore()

const countriesWithCounts = computed(() => {
  const counts = items.value.reduce((acc, item) => {
    acc[item.countryId] = (acc[item.countryId] || 0) + 1
    return acc
  }, {})

  return [
    { id: '0', title: 'Все', count: items.value.length },
    ...countries.value.map(country => ({
      ...country,
      count: counts[country.id] || 0
    }))
  ]
})

const filteredItems = computed(() => {
  let result = items.value

  if (selectedCountry.value !== '0') {
    result = result.filter(item => item.countryId === selectedCountry.value)
  }

  if (searchQuery.value.trim() !== '') {
    result = result.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

onMounted(async () => {
  const [itemsRes, countriesRes] = await Promise.all([
    axios.get('http://localhost:3000/items'),
    axios.get('http://localhost:3000/countries')
  ])
  items.value = itemsRes.data
  countries.value = countriesRes.data
})
</script>

<template>
  <section class="site-main mb-5">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-5">
          <div class="filter-sidebar">
            <div class="filter-sidebar-header">Страны:</div>
            <div class="filter-sidebar-content">
              <div
                  class="form-check"
                  v-for="country in countriesWithCounts"
                  :key="country.id"
              >
                <input
                    class="form-check-input"
                    type="radio"
                    name="country"
                    :id="'country-' + country.id"
                    :value="country.id"
                    v-model="selectedCountry"
                />
                <label class="form-check-label" :for="'country-' + country.id">
                  {{ country.title }} ({{ country.count }})
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-9 col-lg-8 col-md-7">
          <div class="filter-bar mb-3">
            <div>
              <div class="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Название города"
                    v-model="searchQuery"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">Искать</button>
                </div>
              </div>
            </div>
          </div>

          <section class="lattest-product-area pb-40 category-list">
            <div class="card-grid">
              <TourCard
                  v-for="item in filteredItems"
                  :key="item.id"
                  :item="item"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
