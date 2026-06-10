/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import router from "@/routes.ts";

// Styles
import 'unfonts.css'

const app = createApp(App).use(router)

registerPlugins(app)

app.mount('#app')
