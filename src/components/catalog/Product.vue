<script setup lang="ts">
import {useCartStore} from "@/stores/cart";
import type {IProduct} from "@/types/product";
import {ref} from 'vue'


const props = defineProps(['product'])
const product: IProduct = props.product;

const cartStore = useCartStore();
const {add, isInCart} = cartStore;

const loading = ref(false);

function add2Cart(product: IProduct) {
  loading.value = true;
  add(product, 1)
      .then(() => {
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
        alert(error);
      });
}
</script>

<template>
  <div
      :class="$style.productWrapper"
      class="pa-3"
  >
    <v-card :class="$style.product">
      <div
          :class="$style.productLink"
      >
        <div
            :class="$style.productImage"
        >
          <v-img
              class="mx-auto"
              height="100"
              width="auto"
              :src="product.image"
          >
            <template v-slot:error>
              <v-img
                  class="mx-auto"
                  height="100"
                  max-width="auto"
                  src="/catalog/empty.webp"
              ></v-img>
            </template>
          </v-img>

        </div>
        <div
            :class="$style.productTitle"
        >
          {{ product.title }}
        </div>
        <div
            :class="$style.productTitle"
        >
          {{ product.price }} $
        </div>
        <v-btn
            v-if="isInCart(product)"
            :class="$style.productBtn"
            variant="outlined"
            color="primary"
        >
          В корзине
        </v-btn>
        <v-btn
            v-else
            :loading="loading"
            :class="$style.productBtn"
            variant="outlined"
            color="secondary"
            @click="add2Cart(product)"
        >
          В корзину
        </v-btn>
      </div>

    </v-card>
  </div>


</template>

<style module lang="scss">
.productWrapper {
  width: calc(33.333% - 16px);
  text-align: center;

  .product {
    padding: 10px;
    height: 100%;

    .productLink {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;

      .productImage {
        margin-bottom: 8px;
      }

      .productTitle {
        flex-grow: 1;
        margin-bottom: 5px;
      }

      .productBtn {
        font-size: 12px;
      }
    }

  }

}
</style>