<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from "@/components/Header.vue";
</script>

<template>
  <v-app>

    <Header/>

    <main
        :class="$style.content"
        class="pa-3"
    >
      <RouterView/>
    </main>

  </v-app>
</template>

<style module lang="scss">
.content {
  margin-top: 90px;
}
</style>
