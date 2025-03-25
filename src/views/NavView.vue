<template>
	<nav class="navbar">
		<h1 class="navbar_text">MediBax</h1>
		<NavButton
			v-for="(item, index) in menuItems"
			:key="index"
			:icon="getIcon(item.icon, item.link)"
			:text="item.text"
			:link="item.link"
			:class="`item-${index + 1}`"
			:active="isActive(item.link)"
		/>
	</nav>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import NavButton from "@/components/NavButton.vue";

export default {
	components: {
		NavButton,
	},
	setup() {
		const route = useRoute();
		const menuItems = ref([
			{ icon: "ic:outline-home", text: "Inicio", link: "/" },
			{ icon: "ic:outline-search", text: "Analisis", link: "/prediction" },
			{ icon: "ic:outline-clipboard", text: "Expediente", link: "/expediente" },
			{ icon: "ic:outline-person", text: "Profile", link: "/profile" },
		]);

		const isActive = (link) => route.path === link;
		const getIcon = (icon, link) =>
			isActive(link) ? icon.replace("-outline", "") : icon;

		return {
			menuItems,
			isActive,
			getIcon,
		};
	},
};
</script>
