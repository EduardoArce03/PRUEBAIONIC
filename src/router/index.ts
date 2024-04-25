import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import FormularioRegistro from '@/Vista/FormularioRegistro.vue';
import Lista from '@/Vista/Lista.vue';
import Inicio from '@/Vista/Inicio.vue';
import IngresoDatos from '@/Vista/IngresoDatos.vue';
import ExploreContainer from '@/Vista/ExploreContainer.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/registro',
    component: FormularioRegistro
  },
  {
    path: '/creacion',
    component: ExploreContainer
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
