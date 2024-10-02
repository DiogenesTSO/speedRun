import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue' // Caminho correto para o componente
import Menu from '../components/Menu.vue' // Caminho correto para o componente
import DashboardLayout from '@/components/DashboardLayout.vue';

const routes = [
  {path: '/', name: 'login', component: LoginPage},
  {path: '/home', name: 'home', component: Menu},
  {path: '/home/dashboard', name: 'dashboard', component: DashboardLayout},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
