import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/views/HomePage.vue";
import ExpedienteView from "@/views/ExpedienteView.vue";
import AnalisisView from "@/views/AnalisisView.vue";
import Login from "@/views/Login.vue";
import ProfileView from "@/views/ProfileView.vue"; // Importa la vista de perfil

const routes = [
  {path: "/login", name: "Login", component: Login},
  {path: "/", redirect: "/home"},
  {path: "/home", name: "Home", component: HomePage, meta: {requiresAuth: true}},
  {path: "/expediente", name: "Expediente", component: ExpedienteView, meta: {requiresAuth: true}},
  {path: "/analisis", name: "Analisis", component: AnalisisView, meta: {requiresAuth: true}},
  {path: "/profile", name: "Profile", component: ProfileView, meta: {requiresAuth: true}}, // Añade la ruta de perfil
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    // Redirigir a la página de inicio de sesión si el usuario no está autenticado
    next({name: 'Login'});
  } else if (to.name === 'Login' && token) {
    // Redirigir a la página principal si el usuario ya está autenticado
    next({name: 'Home'});
  } else {
    next();
  }
});

export default router;
