<template>
	<div class="edit-paciente-container">
		<form class="edit-paciente-form" @submit.prevent="updatePaciente">
			<h1>Editar Paciente</h1>
			<input v-model="paciente.nombre" type="text" placeholder="Nombre" />
			<input
				v-model="paciente.nombre_segundo"
				type="text"
				placeholder="Segundo Nombre"
			/>
			<input
				v-model="paciente.apellido_paterno"
				type="text"
				placeholder="Apellido Paterno"
			/>
			<input
				v-model="paciente.apellido_materno"
				type="text"
				placeholder="Apellido Materno"
			/>
			<input v-model="paciente.curp" type="text" placeholder="CURP" />
			<input v-model="paciente.telefono" type="text" placeholder="Teléfono" />
			<input v-model="paciente.direccion" type="text" placeholder="Dirección" />
			<select v-model="paciente.estado">
				<option disabled value="">Selecciona un Estado</option>
				<option>Aguascalientes</option>
				<option>Baja California</option>
				<option>Baja California Sur</option>
				<option>Campeche</option>
				<option>Chiapas</option>
				<option>Chihuahua</option>
				<option>Ciudad de México</option>
				<option>Coahuila</option>
				<option>Colima</option>
				<option>Durango</option>
				<option>Estado de México</option>
				<option>Guanajuato</option>
				<option>Guerrero</option>
				<option>Hidalgo</option>
				<option>Jalisco</option>
				<option>Michoacán</option>
				<option>Morelos</option>
				<option>Nayarit</option>
				<option>Nuevo León</option>
				<option>Oaxaca</option>
				<option>Puebla</option>
				<option>Querétaro</option>
				<option>Quintana Roo</option>
				<option>San Luis Potosí</option>
				<option>Sinaloa</option>
				<option>Sonora</option>
				<option>Tabasco</option>
				<option>Tamaulipas</option>
				<option>Tlaxcala</option>
				<option>Veracruz</option>
				<option>Yucatán</option>
				<option>Zacatecas</option>
			</select>
			<input v-model="paciente.ciudad" type="text" placeholder="Ciudad" />
			<select v-model="paciente.estado_civil">
				<option disabled value="">Selecciona Estado Civil</option>
				<option>Soltero</option>
				<option>Casado</option>
				<option>Divorciado</option>
				<option>Viudo</option>
			</select>
			<input v-model="paciente.ocupacion" type="text" placeholder="Ocupación" />
			<button type="submit">Actualizar</button>
		</form>
		<div v-if="error" class="error">{{ error }}</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "../services/api";

export default {
	setup() {
		const paciente = ref({
			nombre: "",
			nombre_segundo: "",
			apellido_paterno: "",
			apellido_materno: "",
			curp: "",
			telefono: "",
			direccion: "",
			estado: "",
			ciudad: "",
			estado_civil: "",
			ocupacion: "",
			usuario_id: 0,
		});
		const error = ref(null);

		onMounted(async () => {
			const id = localStorage.getItem("user_id");
			if (id) {
				try {
					const response = await axios.get(`/expediente/paciente/${id}`);
					if (response.data) {
						paciente.value = { ...paciente.value, ...response.data };
					}
				} catch (err) {
					console.error(err);
					error.value = "Error al cargar los datos del paciente";
				}
			} else {
				console.error("ID de paciente no definido");
				error.value = "ID de paciente no definido";
			}
		});

		const updatePaciente = async () => {
			const id = localStorage.getItem("user_id");
			if (id) {
				try {
					await axios.put(`/expediente/paciente/${id}`, paciente.value);
					error.value = "Paciente actualizado exitosamente";
				} catch (err) {
					console.error(err);
					error.value = "Error al actualizar el paciente";
				}
			} else {
				console.error("ID de paciente no definido");
				error.value = "ID de paciente no definido";
			}
		};

		return {
			paciente,
			error,
			updatePaciente,
		};
	},
};
</script>

<style>
.error {
	color: red;
	margin-top: 10px;
}
</style>
