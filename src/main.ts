import './assets/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'


import { createHead } from '@unhead/vue'
const head = createHead()

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import {VNumberInput} from 'vuetify/labs/VNumberInput'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components: {
        ...components,
        VNumberInput,
    },
    directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(head)

app.mount('#app')
