import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }, // Adiciona meta campo para verificar autenticação
  },
  // Adicione mais rotas conforme necessário
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Usando o guarda de rota beforeEach para verificar a autenticação
router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifica se a chave não está no localStorage
    if (!localStorage.getItem("chave")) {
      // Redireciona para a página de login
      next({ name: 'login' });
    } else {
      // Caso contrário, prossegue para a rota solicitada
      next();
    }
  } else {
    // Se a rota não requer autenticação, apenas prossegue
    next();
  }
});

export default router;