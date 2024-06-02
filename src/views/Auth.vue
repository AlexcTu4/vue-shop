<script setup lang="ts">
import {ref} from 'vue'
import {useUserStore} from "@/stores/user";
import errorToText from "@/utils/ErrorToText";


let valid = ref();
let visible = ref(false);

const userStore = useUserStore();
const {user, v$, auth} = userStore;

</script>

<template>
  <section>
    <v-card
        width="600px"
        class="ma-auto"
    >
      <v-card-title>
        Авторизация
      </v-card-title>
      <v-card-text>
        <v-text-field
            v-model="v$.email.$model"
            :error-messages="errorToText(v$.email.$errors)"
            :error="v$.email.$error"
            label="Email*"
            :validation-value="valid"
            @blur="v$.email.$touch"
            class="pb-2"
            required
            clearable
        ></v-text-field>
        <v-text-field
            v-model="v$.password.$model"
            :error-messages="errorToText(v$.password.$errors)"
            :error="v$.password.$error"
            label="Password*"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            class="pb-2"
            required
            clearable
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div
            v-if="user.error"
            class="text-red"
        >
          {{ user.error }}
        </div>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text="Войти"
            variant="tonal"
            @click="auth()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </section>
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
