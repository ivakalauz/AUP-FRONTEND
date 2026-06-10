<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const clan = reactive<any>({
  ime: '',
  prezime: '',
  email: '',
  broj_telefona: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi člana' : 'Dodaj člana')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi člana')

async function dohvatiClana() {
  if (!route.params.id) return

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanovi/${route.params.id}`)
    const data = await response.json()
    Object.assign(clan, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function pripremiPodatke() {
  return {
    ime: clan.ime,
    prezime: clan.prezime,
    email: clan.email,
    broj_telefona: clan.broj_telefona,
  }
}

async function spremiClana() {
  loading.value = true

  const url = jeUredivanje.value
    ? `${API_URL}/clanovi/${route.params.id}`
    : `${API_URL}/clanovi`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pripremiPodatke()),
    })

    router.push('/clanovi')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/clanovi')
}

onMounted(async () => {
  await dohvatiClana()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="clan.ime"
        label="Ime"
        prepend-inner-icon="mdi-account"
      />

      <v-text-field
        v-model="clan.prezime"
        label="Prezime"
        prepend-inner-icon="mdi-account-outline"
      />

      <v-text-field
        v-model="clan.email"
        label="Email"
        prepend-inner-icon="mdi-email-outline"
      />

      <v-text-field
        v-model="clan.broj_telefona"
        label="Broj telefona"
        prepend-inner-icon="mdi-phone-outline"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn variant="text" @click="odustani">Odustani</v-btn>

      <v-btn color="primary" :loading="loading" @click="spremiClana">
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>