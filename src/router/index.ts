import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import FormularioRegistro from '@/components/FormularioRegistro.vue';
import Lista from '@/components/Lista.vue';
import Inicio from '../components/Inicio.vue';
import IngresoDatos from '../components/IngresoDatos.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/registro',
    component: FormularioRegistro
  },
  {
    path: '/lista',
    component: Lista
  },
  {
    path: '/inicio',
    component: Inicio
  },
  {
    path: '/ingresion',
    component: IngresoDatos
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
