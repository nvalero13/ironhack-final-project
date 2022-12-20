import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/Home.vue"
import Register from "../screens/Register.vue"
import Login from "../screens/Login.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
