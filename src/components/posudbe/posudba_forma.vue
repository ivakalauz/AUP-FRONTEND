<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const clanovi = ref<any[]>([])
const knjige = ref<any[]>([])

const posudba = reactive<any>({
  datum_posudbe: '',
  datum_povrata: '',
  clan_id: '',
  knjiga_id: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi posudbu' : 'Dodaj posudbu')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi posudbu')

async function dohvatiPosudbu() {
  if (!route.params.id) return

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/posudbe/${route.params.id}`)
    const data = await response.json()
    Object.assign(posudba, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

async function dohvatiClanove() {
  try {
    const response = await fetch(`${API_URL}/clanovi-dropdown`)
    clanovi.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

async function dohvatiKnjige() {
  try {
    const response = await fetch(`${API_URL}/knjige-dropdown`)
    knjige.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

function pripremiPodatke() {
  return {
    datum_posudbe: posudba.datum_posudbe,
    datum_povrata: posudba.datum_povrata === '' ? null : posudba.datum_povrata,
    clan_id: posudba.clan_id === '' ? null : Number(posudba.clan_id),
    knjiga_id: posudba.knjiga_id === '' ? null : Number(posudba.knjiga_id),
  }
}

async function spremiPosudbu() {
  loading.value = true

  const url = jeUredivanje.value
    ? `${API_URL}/posudbe/${route.params.id}`
    : `${API_URL}/posudbe`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pripremiPodatke()),
    })

    router.push('/posudbe')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/posudbe')
}

onMounted(async () => {
  await dohvatiClanove()
  await dohvatiKnjige()
  await dohvatiPosudbu()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="posudba.datum_posudbe"
        label="Datum posudbe"
        type="date"
        prepend-inner-icon="mdi-calendar"
      />

      <v-text-field
        v-model="posudba.datum_povrata"
        label="Datum povrata"
        type="date"
        prepend-inner-icon="mdi-calendar-return"
      />

      <v-select
        v-model="posudba.clan_id"
        :items="clanovi"
        label="Član"
        prepend-inner-icon="mdi-account"
        item-title="ime_prezime"
        item-value="id"
      />

      <v-select
        v-model="posudba.knjiga_id"
        :items="knjige"
        label="Knjiga"
        prepend-inner-icon="mdi-book"
        item-title="naslov"
        item-value="id"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn variant="text" @click="odustani">Odustani</v-btn>

      <v-btn color="primary" :loading="loading" @click="spremiPosudbu">
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>