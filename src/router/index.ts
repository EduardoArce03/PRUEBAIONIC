import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app/login'
  },
  {
    path: '/app/',
    component: () => import('@/Vista/Encabezado.vue'),
    children: [
      {
        path: '',
        redirect: '/app/login'
      },
      {
        path: 'login',
        component: () => import('@/Vista/login.vue')
      },
      {
        path: 'creacion',
        component: () => import('@/Vista/ExploreContainer.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
