import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/views/HomePage.vue";
import ExpedienteView from "@/views/ExpedienteView.vue";
import AnalisisView from "@/views/AnalisisView.vue";


const routes = [
  {path: "/", component: HomePage},
  {path: "/expediente", component: ExpedienteView},
  {path: "/analisis", component: AnalisisView},
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
