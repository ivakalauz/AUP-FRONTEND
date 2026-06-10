<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6 text-center">
          <v-icon icon="mdi-book-open-page-variant" size="64" color="primary"></v-icon>
          <h1 class="text-h4 mt-4">Dobrodošli u knjižnicu</h1>
          <p class="text-subtitle-1 mt-2">Odaberite opciju iz navigacije za pregled podataka</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" sm="6" md="3" v-for="stavka in navigacija" :key="stavka.link">
        <v-card :to="stavka.link" class="text-center pa-4" hover>
          <v-icon :icon="stavka.ikona" size="48" color="primary"></v-icon>
          <h3 class="text-h6 mt-3">{{ stavka.text }}</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const navigacija = [
  { text: 'Autori', link: '/autori', ikona: 'mdi-account-group' },
  { text: 'Članovi', link: '/clanovi', ikona: 'mdi-account-multiple' },
  { text: 'Knjige', link: '/knjige', ikona: 'mdi-bookshelf' },
  { text: 'Posudbe', link: '/posudbe', ikona: 'mdi-book-open-page-variant' }
]
</script>