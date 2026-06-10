<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const autor = reactive<any>({
  id: '',
  ime: '',
  prezime: '',
  email: '',
})

async function dohvatiAutora() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/autori/${route.params.id}`)
    const data = await response.json()
    Object.assign(autor, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function povratak() {
  router.push('/autori')
}

function urediAutora() {
  router.push(`/autori/${route.params.id}/uredi`)
}

onMounted(async () => {
  await dohvatiAutora()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title class="d-flex align-center">
      Pregled autora

      <v-spacer />

      <v-btn color="primary" prepend-icon="mdi-pencil" @click="urediAutora">
        Uredi
      </v-btn>
    </v-card-title>

    <v-card-text v-if="!loading">
      <p><strong>ID:</strong> {{ autor.id }}</p>
      <p><strong>Ime:</strong> {{ autor.ime }}</p>
      <p><strong>Prezime:</strong> {{ autor.prezime }}</p>
      <p><strong>Email:</strong> {{ autor.email }}</p>
    </v-card-text>

    <v-card-text v-else>Učitavanje...</v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="povratak">Natrag</v-btn>
    </v-card-actions>
  </v-card>
</template>