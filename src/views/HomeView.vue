<script setup lang="ts">
import SideBar from "@/components/catalog/SideBar.vue";
import ProductsList from "@/components/catalog/ProductsList.vue";
</script>

<template>
    <v-row class="g-1">
      <v-col
          cols="12"
          sm="3"
      >
        <SideBar/>
      </v-col>
      <v-col
          cols="12"
          sm="9"
      >
        <ProductsList/>
      </v-col>
    </v-row>
</template>

<style module lang="scss">


</style>
