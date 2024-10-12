import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue';
import Menu from '@/components/Menu.vue';
import CadastrarCorredores from '@/components/CadastrarCorredores.vue';
import ListarCorredores from '@/components/ListarCorredores.vue';
import LoginPage from '@/components/LoginPage.vue';
import GestaoEventos from '@/components/GestaoEventos.vue';

const routes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/home',
    component: Menu,  // O Menu serve como "layout" para as páginas filhas
    children: [
      {
        path: 'dashboard',
        component: DashboardLayout,
      },
      {
        path: 'cadastro-corredores',
        component: CadastrarCorredores,
      },
      {
        path: 'listar-corredores',
        component: ListarCorredores,
      },
      {
        path: 'eventos',
        component: GestaoEventos,
      },
    ]
  },
  {
    path: '/',
    redirect: '/login',
  }
];
/*
const routes = [
  {path: '/', name: 'login', component: LoginPage},
  {path: '/home', component: Menu,}
  
]; */

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
