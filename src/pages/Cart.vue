<script setup>
import { useCartStore } from '../store/cartStore'
const cart = useCartStore()
</script>

<template>
  <section class="site-main mb-5">
    <div class="container">
      <div v-if="cart.items.length === 0" class="text-center py-5">
        <h4>Ваша корзина пуста</h4>
      </div>

      <table v-else class="table">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Путевка</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Сумма</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in cart.items" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.price.toLocaleString() }} руб</td>
          <td>
            <input
                type="number"
                class="form-control cart-number"
                v-model.number="item.count"
                min="1"
            />
          </td>
          <td>{{ (item.price * item.count).toLocaleString() }} руб</td>
          <td>
            <button type="button" class="btn btn-danger" @click="cart.removeItem(item.id)">
              Удалить
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row" colspan="3">&nbsp;</th>
          <td><b>Итого:</b></td>
          <td>{{ cart.totalPrice.toLocaleString() }} руб</td>
          <td>&nbsp;</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
