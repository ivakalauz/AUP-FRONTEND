<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const autori = ref<any[]>([])

const knjiga = reactive<any>({
  naslov: '',
  godina_izdanja: '',
  broj_stranica: '',
  autor_id: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi knjigu' : 'Dodaj knjigu')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi knjigu')

async function dohvatiKnjigu() {
  if (!route.params.id) return

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/knjige/${route.params.id}`)
    const data = await response.json()
    Object.assign(knjiga, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

async function dohvatiAutore() {
  try {
    const response = await fetch(`${API_URL}/autori-dropdown`)
    autori.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

function pripremiPodatke() {
  return {
    naslov: knjiga.naslov,
    godina_izdanja: knjiga.godina_izdanja === '' ? null : Number(knjiga.godina_izdanja),
    broj_stranica: knjiga.broj_stranica === '' ? null : Number(knjiga.broj_stranica),
    autor_id: knjiga.autor_id === '' ? null : Number(knjiga.autor_id),
  }
}

async function spremiKnjigu() {
  loading.value = true

  const url = jeUredivanje.value
    ? `${API_URL}/knjige/${route.params.id}`
    : `${API_URL}/knjige`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pripremiPodatke()),
    })

    router.push('/knjige')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/knjige')
}

onMounted(async () => {
  await dohvatiAutore()
  await dohvatiKnjigu()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="knjiga.naslov"
        label="Naslov"
        prepend-inner-icon="mdi-book-open-page-variant-outline"
      />

      <v-text-field
        v-model="knjiga.godina_izdanja"
        label="Godina izdanja"
        type="number"
        prepend-inner-icon="mdi-calendar"
      />

      <v-text-field
        v-model="knjiga.broj_stranica"
        label="Broj stranica"
        type="number"
        prepend-inner-icon="mdi-page-layout-body"
      />

      <v-select
        v-model="knjiga.autor_id"
        :items="autori"
        label="Autor"
        prepend-inner-icon="mdi-account"
        item-title="ime_prezime"
        item-value="id"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn variant="text" @click="odustani">Odustani</v-btn>

      <v-btn color="primary" :loading="loading" @click="spremiKnjigu">
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>