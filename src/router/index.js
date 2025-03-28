import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import HomeView from "../views/HomeView.vue";
import ExpedienteView from "../views/ExpedienteView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ProfileView from "@/views/ProfileView.vue";
import PredictionView from "@/views/PredictionView.vue";
import MostrarExpediente from "@/views/MostrarExpediente.vue"; // Importar la nueva vista

const routes = [
	{
		path: "/",
		component: MainLayout,
		children: [
			{
				path: "",
				name: "home",
				component: HomeView,
				meta: { requiresAuth: true },
			},
			{
				path: "expediente",
				name: "Expediente",
				component: ExpedienteView,
				meta: { requiresAuth: true },
			},
			{
				path: "profile",
				name: "profile",
				component: ProfileView,
				meta: { requiresAuth: true },
			},
			{
				path: "prediction",
				name: "prediction",
				component: PredictionView,
				meta: { requiresAuth: true },
			},
			{
				path: "mostrar-expediente/:token_unico", // Ruta para mostrar expediente por token
				name: "mostrar-expediente",
				component: MostrarExpediente,
				meta: { requiresAuth: false }, // Permitir acceso sin autenticación
			},
		],
	},
	{
		path: "/",
		component: AuthLayout,
		children: [
			{
				path: "login",
				name: "login",
				component: LoginView,
			},
			{
				path: "signup",
				name: "signup",
				component: SignupView,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token");
	if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
		next({ name: "login" });
	} else {
		next();
	}
});

export default router;
