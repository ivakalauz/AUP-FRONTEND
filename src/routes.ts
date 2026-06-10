import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Pocetna = () => import('@/components/pocetna.vue')
const Autori = () => import('@/components/autori/autor_table.vue')
const AutorForma = () => import('@/components/autori/autor_forma.vue')
const AutorPregled = () => import('@/components/autori/autor_pregled.vue')
const Knjige = () => import('@/components/knjige/knjige_table.vue')
const KnjigaForma = () => import('@/components/knjige/knjiga_forma.vue')
const Clanovi = () => import('@/components/clanovi/clanovi.vue')
const ClanForma = () => import('@/components/clanovi/clan_forma.vue')
const Posudbe = () => import('@/components/posudbe/posudbe.vue')
const PosudbaForma = () => import('@/components/posudbe/posudba_forma.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna,
  },
  {
    path: '/autori',
    name: 'Autori',
    component: Autori,
  },
  {
    path: '/autori/dodaj',
    name: 'AutorDodaj',
    component: AutorForma,
  },
  {
    path: '/autori/:id',
    name: 'AutorPregled',
    component: AutorPregled,
  },
  {
    path: '/autori/:id/uredi',
    name: 'AutorUredi',
    component: AutorForma,
  },
  { 
    path: '/knjige',
    name: 'Knjige', 
    component: Knjige,
  },
  { 
    path: '/knjige/dodaj', 
    name: 'KnjigaDodaj', 
    component: KnjigaForma,
  },
  {
    path: '/knjige/:id/uredi', 
    name: 'KnjigaUredi', 
    component: KnjigaForma,
  },
  { 
    path: '/clanovi', 
    name: 'Clanovi', 
    component: Clanovi 
  },
  { 
    path: '/clanovi/dodaj', 
    name: 'ClanDodaj', 
    component: ClanForma 
  },
  { 
    path: '/clanovi/:id/uredi', 
    name: 'ClanUredi', 
    component: ClanForma 
  },
  { 
    path: '/posudbe', 
    name: 'Posudbe', 
    component: Posudbe 
  },
  { 
    path: '/posudbe/dodaj', 
    name: 'PosudbaDodaj', 
    component: PosudbaForma 
  },
  { 
    path: '/posudbe/:id/uredi', 
    name: 'PosudbaUredi', 
    component: PosudbaForma 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router