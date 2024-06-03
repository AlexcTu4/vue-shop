<script setup lang="ts">
import ProductTable from "@/components/cart/ProductTable.vue";
import {useCartStore} from "@/stores/cart";
import {storeToRefs} from "pinia";
import {ref} from 'vue'
import router from "@/router";


const storeCart = useCartStore();
const {cartCount, cartTotalPrice} = storeToRefs(storeCart);
const {order, clearCart} = storeCart;

let isActiveDialogOrder = ref(false);
let loading = ref(false);

function closeSuccessOrder() {
  clearCart();
  isActiveDialogOrder.value = false;
  router.push({path: '/'})
}

function sendOrder() {
  loading.value = true;
  order()
      .then((data) => {
        if (data) {
          loading.value = false;
          isActiveDialogOrder.value = true;
        }
      })
      .catch((error) => {
        loading.value = false;
        alert(error)
      })
}
</script>

<template>
  <section>
    <div
        v-if="cartCount"
    >
      <v-card>
        <v-card-title>
          <h1>
            Товары в корзине
          </h1>
        </v-card-title>
        <v-card-text>
          <ProductTable/>
        </v-card-text>

        <v-card-actions>
          <div class="text-h5">
            Всего товаров {{ cartCount }} на сумму {{ cartTotalPrice }}
          </div>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text="Оформить"
              variant="tonal"
              @click="sendOrder"
              :loading="loading"
          ></v-btn>
          <v-dialog
              max-width="300"
              v-model="isActiveDialogOrder"
          >
            <template v-slot:default="{ isActiveDialogOrder }">
              <v-card title="Заказ №123123">
                <v-card-text>
                  Ваш заказ успешно оформлен
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                      color="primary"
                      text="Закрыть"
                      variant="tonal"
                      @click="closeSuccessOrder()"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>


    </div>
    <div
        v-else
        class="text-center mt-9"
    >
      <h1
          class="mb-5"
      >
        Ваша корзина пуста
      </h1>

      <router-link to="/">
        <v-btn
            color="primary"
        >
          Вернуться к покупкам
        </v-btn>
      </router-link>
    </div>
  </section>
  <h1></h1>
</template>

<style scoped lang="scss">

</style>