<script setup lang="ts">
import {useCartStore} from "@/stores/cart";
import {storeToRefs} from "pinia";

const storeCart = useCartStore();
const {cartProducts} = storeToRefs(storeCart);
const {setQty} = storeCart;
console.log(cartProducts);
const columns = [
  {
    title: '№',
    align: 'center',
    sortable: false,
    width: '10%',
    key: 'id',
  },
  {
    title: 'Наименование товара',
    align: 'center',
    sortable: false,
    width: '50%',
    key: 'title',
  },
  {
    title: 'Количество',
    align: 'center',
    sortable: false,
    width: '20%',
    key: 'qty',
  },
  {
    title: 'Цена за ед.',
    align: 'center',
    sortable: false,
    width: '10%',
    key: 'price',
  },
  {
    title: 'Итого',
    align: 'center',
    sortable: false,
    width: '10%',
    key: 'totalPrice',
  },
]


//     {
//   id: '№',
//   title: 'Наименование товара',
//   qty: 'Количество',
//   price: 'Цена за ед.'
// }
// ['№', 'Наименование товара', 'Количество', 'Цена за ед.', 'Итого']

function test(value){
  console.log(value)
}
</script>

<template>

  <v-data-table
      :headers="columns"
      :items="cartProducts"
      :item-class="'pa-2'"
      hide-default-footer

  >
    <template v-slot:item.title="{ item }">
      <div
          class="d-flex justify-center align-center ga-3"
      >
        <div style="width: 50px">
          <v-img
              class="mx-auto"
              height="30"
              width="auto"
              :src="item.image"
          >
            <template v-slot:error>
              <v-img
                  class="mx-auto"
                  height="30"
                  width="auto"
                  src="/catalog/empty.webp"
              ></v-img>
            </template>
          </v-img>
        </div>

        <div class="" style="width: 250px">
          {{ item.title }}
        </div>
      </div>
    </template>
    <template v-slot:item.qty="{ item }">
      <v-number-input
          v-model="item.qty"
          @update:modelValue="setQty(item)"
          control-variant="split"
          variant="filled"
          :min="0"
          :class="$style.productQty"
          hide-details
          inset
      ></v-number-input>
    </template>

  </v-data-table>
</template>

<style module lang="scss">
.productQty{
  padding: 10px 0!important;
}
</style>
