<script setup lang="ts">
import {useCartStore} from "@/stores/cart";

const cartStore = useCartStore();
const {getCount} = cartStore;
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
              src="/images/logo.jpg"
              alt="Логотип"
          ></v-img>
        </router-link>
      </template>
      <v-app-bar-title>Стичленд</v-app-bar-title>
      <template v-slot:append>
        <div
          :class="$style.cartIcon"
        >
          <router-link to="/cart" style="display: block">
            <v-badge
                v-if="getCount()"
                :content="getCount()"
            >
              <v-icon
                  icon="mdi-cart-outline"
              ></v-icon>
            </v-badge>
            <v-icon
                v-else
                icon="mdi-cart-outline"
            ></v-icon>
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