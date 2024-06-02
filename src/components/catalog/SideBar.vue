<script setup lang="ts">
import {useFilterStore} from "@/stores/filter";
import {storeToRefs} from "pinia";
import {useProductsListStore} from "@/stores/productsList";

const storeFilter = useFilterStore();
const {categoriesData, filterData, v$} = storeToRefs(storeFilter);
const {reset, apply} = storeFilter;


const storeProductsList = useProductsListStore();

</script>

<template>
  <section>
    <v-card>
      <v-card-title>
        <h2
            class="text-center"
        >
          Фильтр
        </h2>

        <v-card-text>
          <div class="mb-3">
            <h3 class="pb-3">
              Категории
            </h3>
            <div>
              <h4 class="pb-2">
                Выберите категорию
              </h4>
              <v-select
                  :items="categoriesData"
                  v-model="filterData.category"
                  variant="outlined"
              ></v-select>
            </div>
          </div>

          <div class="mb-3">
            <h3 class="pb-3">
              Цена
            </h3>
            <div>
              <div
                  class="d-flex ga-3"
              >
                <v-text-field
                    type="number"
                    label="Мин. цена"
                    v-model="filterData.minPrice"
                    @input="filterData.userInputMinPrice = true"
                ></v-text-field>
                <v-text-field
                    type="number"
                    label="Макс. цена"
                    v-model="v$.maxPrice.$model"
                    :error="v$.maxPrice.$error"
                    @input="filterData.userInputMaxPrice = true"
                ></v-text-field>
              </div>
            </div>
          </div>


          <div
              class="d-flex flex-column ga-2"
          >
            <v-btn
                color="secondary"
                @click="reset()"
            >
              Сброс
            </v-btn>
            <v-btn
                color="primary"
                @click="apply()"
            >
              Применить
            </v-btn>
          </div>
        </v-card-text>


      </v-card-title>
    </v-card>
  </section>

</template>

<style scoped lang="scss">

</style>