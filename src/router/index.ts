import { createRouter, createWebHashHistory } from 'vue-router'
import PainelEstrategico from '../views/PainelEstrategico.vue'
import PainelOperacional from '../views/PainelOperacional.vue'

const routes = [
  {
    path: '/',
    redirect: '/estrategico'
  },
  {
    path: '/estrategico',
    name: 'Estrategico',
    component: PainelEstrategico
  },
  {
    path: '/operacional',
    name: 'Operacional',
    component: PainelOperacional
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
