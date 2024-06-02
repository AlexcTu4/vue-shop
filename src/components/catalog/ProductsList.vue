<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useProductsListStore} from "@/stores/productsList";
import Product from "@/components/catalog/Product.vue";
import {useFilterStore} from "@/stores/filter";

const storeProducts = useProductsListStore();
const {products, categoryName} = storeToRefs(storeProducts);
</script>

<template>
  <section>
    <v-card>
      <v-card-title><h1>{{ categoryName }}</h1></v-card-title>
      <v-card-text>
        <div class="d-flex flex-wrap ga-6">
          <Product
              v-for="product in products"
              :key="product.id"
              :product="product"
          />
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<style scoped lang="scss">

</style>