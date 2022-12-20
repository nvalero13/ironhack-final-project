import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/Home.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
