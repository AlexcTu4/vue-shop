<script setup lang="ts">
import {useCartStore} from "@/stores/cart";
import {storeToRefs} from "pinia";

const cartStore = useCartStore();
const {cartCount} = storeToRefs(cartStore);
</script>

<template>
  <header>
    <v-app-bar
        class="pa-3"
        :elevation="1"
    >
      <template v-slot:prepend>
        <router-link to="/">
          <v-img
              width="100px"
              src="/vue-shop/images/logo.jpg"
              alt="Логотип"
          ></v-img>
        </router-link>
      </template>
      <template v-slot:append>
        <div
          :class="$style.cartIcon"
        >
          <router-link to="/cart">
            <v-badge
                :content="cartCount"
                :model-value="cartCount > 0"
                class="text-none"
            >
              <v-icon
                  icon="mdi-cart-outline"
              ></v-icon>
            </v-badge>

          </router-link>

        </div>

      </template>

    </v-app-bar>
  </header>
</template>

<style module lang="scss">
.cartIcon{
  margin-right: 10px;
}
</style>