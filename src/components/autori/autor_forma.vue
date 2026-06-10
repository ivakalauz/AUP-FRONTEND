<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const autor = reactive<any>({
  ime: '',
  prezime: '',
  email: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi autora' : 'Dodaj autora')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi autora')

async function dohvatiAutora() {
  if (!route.params.id) return

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

async function spremiAutora() {
  loading.value = true

  const url = jeUredivanje.value
    ? `${API_URL}/autori/${route.params.id}`
    : `${API_URL}/autori`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(autor),
    })

    router.push('/autori')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/autori')
}

onMounted(async () => {
  await dohvatiAutora()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="autor.ime"
        label="Ime"
        prepend-inner-icon="mdi-account"
      />

      <v-text-field
        v-model="autor.prezime"
        label="Prezime"
        prepend-inner-icon="mdi-account-outline"
      />

      <v-text-field
        v-model="autor.email"
        label="Email"
        prepend-inner-icon="mdi-email-outline"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn variant="text" @click="odustani">Odustani</v-btn>

      <v-btn color="primary" :loading="loading" @click="spremiAutora">
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>