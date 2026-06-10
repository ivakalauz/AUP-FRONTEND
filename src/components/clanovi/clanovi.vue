<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5005'
const router = useRouter()
const loading = ref(false)
const clanovi = ref<any[]>([])
const prikazi_dialog_brisanje = ref(false)
const clan_za_brisanje = ref<any>(null)

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'Email', value: 'email' },
  { title: 'Broj člana', value: 'broj_clana' },
  { title: 'Akcije', key: 'actions', sortable: false },
]

async function dohvatiClanove() {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/clanovi`)
    const data = await response.json()
    clanovi.value = data
    console.log('Učitano članova:', clanovi.value.length)
  } catch (error) {
    console.error('Greška:', error)
  } finally {
    loading.value = false
  }
}

function idiNaDodavanje() {
  router.push('/clanovi/dodaj')
}

function uredi(clan: any) {
  router.push(`/clanovi/${clan.id}/uredi`)
}

function otvoriBrisanje(clan: any) {
  clan_za_brisanje.value = clan
  prikazi_dialog_brisanje.value = true
}

async function obrisiClana() {
  if (!clan_za_brisanje.value) return
  
  loading.value = true
  try {
    await fetch(`${API_URL}/clanovi/${clan_za_brisanje.value.id}`, {
      method: 'DELETE',
    })
    await dohvatiClanove()
  } catch (error) {
    console.error(error)
  }
  loading.value = false
  prikazi_dialog_brisanje.value = false
}

onMounted(() => {
  dohvatiClanove()
})
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Članovi
      <v-spacer />
      <v-btn color="primary" prepend-icon="mdi-plus" @click="idiNaDodavanje">
        Dodaj
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="clanovi"
        :loading="loading"
        items-per-page="10"
      >
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click="uredi(item)"
          />
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="red"
            @click="otvoriBrisanje(item)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="prikazi_dialog_brisanje" max-width="500">
    <v-card>
      <v-card-title>Potvrda brisanja</v-card-title>
      <v-card-text>Jeste li sigurni da želite obrisati člana?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="prikazi_dialog_brisanje = false">Odustani</v-btn>
        <v-btn color="red" :loading="loading" @click="obrisiClana">Obriši</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>