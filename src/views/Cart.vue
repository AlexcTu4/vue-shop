<script setup lang="ts">
import CartApp from "@/components/cart/CartApp.vue";
import {useHead} from "@unhead/vue";
useHead({
  title: 'Корзина',
  meta: [
    {
      name: 'description',
      content: 'Просмотр товаров в корзине и оформление заказа'
    }
  ]
})
</script>

<template>
    <CartApp/>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
