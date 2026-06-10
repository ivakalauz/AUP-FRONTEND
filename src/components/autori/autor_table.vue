<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const autori = ref<any[]>([])
const autor_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'Email', value: 'email' },
  { title: 'Akcije', key: 'actions', sortable: false },
]

async function dohvatiAutore() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/autori?q=${encodeURIComponent(pretraga.value)}`)
    autori.value = await response.json()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/autori/dodaj')
}

async function pretraziAutore() {
  await dohvatiAutore()
}

function pregledaj(autor: any) {
  router.push(`/autori/${autor.id}`)
}

function uredi(autor: any) {
  router.push(`/autori/${autor.id}/uredi`)
}

function otvoriBrisanje(autor: any) {
  autor_za_brisanje.value = autor
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  autor_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiAutora() {
  if (!autor_za_brisanje.value) return

  loading.value = true

  try {
    await fetch(`${API_URL}/autori/${autor_za_brisanje.value.id}`, {
      method: 'DELETE',
    })

    await dohvatiAutore()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiAutore()
})
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Autori

      <v-spacer />

      <v-btn color="primary" prepend-icon="mdi-plus" @click="idiNaDodavanje">
        Dodaj
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="pretraga"
        label="Pretraži autore"
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
        @update:model-value="pretraziAutore"
      />

      <v-data-table :headers="headers" :items="autori" :loading="loading">
        <template #item.actions="{ item }">
          <v-tooltip text="Pregledaj">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-eye"
                size="small"
                variant="text"
                @click="pregledaj(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Uredi">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="uredi(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Obriši">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="otvoriBrisanje(item)"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="prikazi_dialog_brisanje" max-width="500">
    <v-card>
      <v-card-title>Potvrda brisanja</v-card-title>
      <v-card-text>Jeste li sigurni da želite obrisati autora?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="zatvoriBrisanje">Odustani</v-btn>
        <v-btn color="red" :loading="loading" @click="obrisiAutora">Obriši</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>