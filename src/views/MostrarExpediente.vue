<template>
	<div class="expediente-container">
		<h1>Expediente Médico</h1>
		<div v-if="expediente">
			<div class="paciente-info">
				<h2>Información general.</h2>
				<p><strong>Nombre:</strong> {{ expediente.paciente.nombre }}</p>
				<p>
					<strong>Segundo Nombre:</strong>
					{{ expediente.paciente.nombre_segundo }}
				</p>
				<p>
					<strong>Apellido Paterno:</strong>
					{{ expediente.paciente.apellido_paterno }}
				</p>
				<p>
					<strong>Apellido Materno:</strong>
					{{ expediente.paciente.apellido_materno }}
				</p>
				<p><strong>CURP:</strong> {{ expediente.paciente.curp }}</p>
				<p><strong>Teléfono:</strong> {{ expediente.paciente.telefono }}</p>
				<p><strong>Dirección:</strong> {{ expediente.paciente.direccion }}</p>
				<p><strong>Estado:</strong> {{ expediente.paciente.estado }}</p>
				<p><strong>Ciudad:</strong> {{ expediente.paciente.ciudad }}</p>
				<p>
					<strong>Estado Civil:</strong> {{ expediente.paciente.estado_civil }}
				</p>
				<p><strong>Ocupación:</strong> {{ expediente.paciente.ocupacion }}</p>
			</div>
			<span>-</span>
			<div class="paciente-info">
				<h2>Antecedentes Personales No Patológicos</h2>
				<p>
					<strong>Hábitos alimenticios:</strong>
					{{ expediente.paciente.habito_alimenticio }}
				</p>
				<p>
					<strong>Actividad física:</strong>
					{{ expediente.paciente.actividad_fisica }}
				</p>
				<p>
					<strong>Consumo de sustancias (tabaco, alcohol, drogas):</strong>
					{{ expediente.paciente.consumo_sustancias }}
				</p>
				<p>
					<strong>Inmunizaciones:</strong>
					{{ expediente.paciente.inmunizaciones }}
				</p>
				<p>
					<strong>Condiciones de vivienda y entorno:</strong>
					{{ expediente.paciente.condiciones_vivienda }}
				</p>
			</div>
			<span>-</span>
			<div class="paciente-info">
				<h2>Antecedentes Personales Patológicos</h2>
				<p>
					<strong>Enfermedades previas y crónicas:</strong>
					{{ expediente.paciente.ninguna }}
				</p>
				<p>
					<strong>Cirugías y procedimientos:</strong>
					{{ expediente.paciente.ninguna }}
				</p>
				<p>
					<strong>Alergias (medicamentos, alimentos, ambientales):</strong>
					{{ expediente.paciente.ninguna }}
				</p>
				<p>
					<strong>Hospitalizaciones:</strong> {{ expediente.paciente.ninguna }}
				</p>
				<p><strong>Transfusiones:</strong> {{ expediente.paciente.ninguna }}</p>
			</div>
			<span>-</span>
			<div class="paciente-info">
				<h2>Antecedentes HeredoFamiliares</h2>
				<p>
					<strong>Enfermedades crónicas en familiares directos:</strong>
					{{ expediente.paciente.ninguna }}
				</p>
				<p>
					<strong>Historial de enfermedades genéticas:</strong>
					{{ expediente.paciente.ninguna }}
				</p>
			</div>
		</div>
		<div v-else>
			<p>Cargando expediente...</p>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "../services/api";
import { useRoute } from "vue-router";

export default {
	setup() {
		const expediente = ref(null);
		const route = useRoute();

		onMounted(async () => {
			const tokenUnico = route.params.token_unico;
			try {
				const response = await axios.get(`/expediente/${tokenUnico}`);
				expediente.value = response.data;
			} catch (error) {
				console.error("Error al cargar el expediente:", error);
			}
		});

		return {
			expediente,
		};
	},
};
</script>

<style scoped>
.paciente-info {
	border: 1px solid #ccc;
	padding: 10px;
	margin-bottom: 10px;
}
</style>
