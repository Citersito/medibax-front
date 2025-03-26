<template>
	<div class="predict-container">
		<h1>Predicción de Enfermedades</h1>
		<form @submit.prevent="predictDisease">
			<!-- Información del Paciente -->
			<section class="patient-info">
				<h2>Información del Paciente</h2>
				<div class="form-group">
					<label for="age">Edad</label>
					<input
						v-model.number="form.age"
						id="age"
						type="number"
						min="0"
						required
					/>
				</div>
				<div class="form-group">
					<label>Sexo</label>
					<div class="radio-group">
						<label>
							<input type="radio" v-model="form.sex" value="M" required />
							Masculino
						</label>
						<label>
							<input type="radio" v-model="form.sex" value="F" required />
							Femenino
						</label>
					</div>
				</div>
			</section>

			<!-- Selección de Síntomas con píldoras clickeables -->
			<section class="symptoms">
				<h2>Síntomas</h2>
				<div class="pills-container">
					<button
						v-for="symptom in symptomList"
						:key="symptom.key"
						type="button"
						:class="['pill', { active: form[symptom.key] === 1 }]"
						@click="toggleSymptom(symptom.key)"
					>
						{{ symptom.label }}
					</button>
				</div>
			</section>

			<!-- Duración de los Síntomas -->
			<section class="duration">
				<h2>Duración de los Síntomas</h2>
				<div class="form-group">
					<label for="symptom_duration_days">Cantidad de días</label>
					<input
						v-model.number="form.symptom_duration_days"
						id="symptom_duration_days"
						type="number"
						min="0"
						required
					/>
				</div>
			</section>

			<button type="submit">Predecir</button>
		</form>

		<!-- Modal para mostrar el prediagnóstico -->
		<div v-if="showModal" class="modal-overlay" @click.self="closeModal">
			<div class="modal-content">
				<h2>Predicción:</h2>
				<p>{{ prediction }}</p>
				<button class="close-btn" @click="closeModal">Cerrar</button>
			</div>
		</div>

		<!-- Mensaje de error -->
		<div v-if="error" class="error">{{ error }}</div>
	</div>
</template>

<script>
import axios from "../services/api";

export default {
	data() {
		return {
			form: {
				age: 17,
				sex: "M",
				fever: 0,
				sore_throat: 0,
				cough: 0,
				headache: 0,
				fatigue: 0,
				body_ache: 0,
				runny_nose: 0,
				congestion: 0,
				shortness_of_breath: 0,
				nausea: 0,
				vomiting: 0,
				diarrhea: 0,
				chills: 0,
				rash: 0,
				chest_pain: 0,
				dizziness: 0,
				swollen_lymph_nodes: 0,
				loss_of_appetite: 0,
				joint_pain: 0,
				abdominal_pain: 0,
				ear_pain: 0,
				eye_redness: 0,
				loss_of_taste: 0,
				loss_of_smell: 0,
				wheezing: 0,
				hoarse_voice: 0,
				difficulty_swallowing: 0,
				muscle_weakness: 0,
				night_sweats: 0,
				confusion: 0,
				rapid_breathing: 0,
				jaundice: 0,
				itching: 0,
				bruising: 0,
				blood_in_stool: 0,
				weight_loss: 0,
				insomnia: 0,
				sweating: 0,
				symptom_duration_days: 3,
			},
			prediction: null,
			error: null,
			showModal: false,
			symptomList: [
				{ key: "fever", label: "Fiebre" },
				{ key: "sore_throat", label: "Dolor de garganta" },
				{ key: "cough", label: "Tos" },
				{ key: "headache", label: "Dolor de cabeza" },
				{ key: "fatigue", label: "Fatiga" },
				{ key: "body_ache", label: "Dolor corporal" },
				{ key: "runny_nose", label: "Rinitis" },
				{ key: "congestion", label: "Congestión" },
				{ key: "shortness_of_breath", label: "Dificultad para respirar" },
				{ key: "nausea", label: "Náusea" },
				{ key: "vomiting", label: "Vómito" },
				{ key: "diarrhea", label: "Diarrea" },
				{ key: "chills", label: "Escalofríos" },
				{ key: "rash", label: "Erupción" },
				{ key: "chest_pain", label: "Dolor en el pecho" },
				{ key: "dizziness", label: "Mareo" },
				{ key: "swollen_lymph_nodes", label: "Ganglios inflamados" },
				{ key: "loss_of_appetite", label: "Pérdida de apetito" },
				{ key: "joint_pain", label: "Dolor en las articulaciones" },
				{ key: "abdominal_pain", label: "Dolor abdominal" },
				{ key: "ear_pain", label: "Dolor de oídos" },
				{ key: "eye_redness", label: "Enrojecimiento ocular" },
				{ key: "loss_of_taste", label: "Pérdida de gusto" },
				{ key: "loss_of_smell", label: "Pérdida del olfato" },
				{ key: "wheezing", label: "Sibilancias" },
				{ key: "hoarse_voice", label: "Voz ronca" },
				{ key: "difficulty_swallowing", label: "Dificultad para tragar" },
				{ key: "muscle_weakness", label: "Debilidad muscular" },
				{ key: "night_sweats", label: "Sudores nocturnos" },
				{ key: "confusion", label: "Confusión" },
				{ key: "rapid_breathing", label: "Respiración rápida" },
				{ key: "jaundice", label: "Ictericia" },
				{ key: "itching", label: "Picazón" },
				{ key: "bruising", label: "Moretones" },
				{ key: "blood_in_stool", label: "Sangre en las heces" },
				{ key: "weight_loss", label: "Pérdida de peso" },
				{ key: "insomnia", label: "Insomnio" },
				{ key: "sweating", label: "Sudoración" },
			],
		};
	},
	methods: {
		toggleSymptom(symptomKey) {
			// Alterna el valor entre 0 y 1 para el síntoma
			this.form[symptomKey] = this.form[symptomKey] === 1 ? 0 : 1;
		},
		async predictDisease() {
			try {
				const response = await axios.post("/api/ai/predict", this.form);
				this.prediction = response.data;
				this.error = null;
				this.showModal = true;
			} catch (error) {
				this.error = "Error al realizar la predicción";
				this.prediction = null;
			}
		},
		closeModal() {
			this.showModal = false;
		},
	},
};
</script>

<style scopped>
.predict-container {
	max-width: 800px;
	margin: 40px auto;
	padding: 30px;
	font-family: "Inter", sans-serif;
	background: #1a1a1a;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

h1 {
	color: #e0e0e0;
	font-weight: 700;
	margin-bottom: 30px;
	text-align: center;
}

.patient-info,
.symptoms,
.duration {
	margin-bottom: 25px;
	padding: 20px;
	background: #2d2d2d;
	border-radius: 8px;
	border: 1px solid #3a3a3a;
}

h2 {
	color: #e0e0e0;
	font-size: 1.25rem;
	margin-bottom: 15px;
	position: relative;
	padding-left: 15px;
}

h2::before {
	content: "";
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 4px;
	height: 20px;
	background: #6c63ff;
	border-radius: 2px;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 8px;
	color: #bdbdbd;
	font-weight: 500;
}

input[type="number"],
input[type="text"] {
	width: 100%;
	padding: 10px;
	border: 1px solid #4a4a4a;
	border-radius: 6px;
	background: #3a3a3a;
	color: #e0e0e0;
	transition: all 0.2s ease;
}

input:focus {
	border-color: #6c63ff;
	box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.3);
}

.radio-group {
	display: flex;
	gap: 15px;
	margin-top: 8px;
}

.radio-group label {
	display: flex;
	align-items: center;
	gap: 8px;
	font-weight: normal;
	color: #8a8a8a;
}

.pills-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	gap: 12px;
	margin-top: 15px;
}

.pill {
	padding: 12px 16px;
	border: 1px solid #4a4a4a;
	border-radius: 20px;
	background: #3a3a3a;
	color: #e0e0e0;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	text-align: center;
}

.pill.active {
	background: #6c63ff;
	color: white;
	border-color: #6c63ff;
	box-shadow: 0 2px 4px rgba(108, 99, 255, 0.3);
}

.pill:hover:not(.active) {
	border-color: #6c63ff;
	color: #6c63ff;
}

.duration input {
	max-width: 120px;
}

button[type="submit"] {
	width: 100%;
	padding: 12px;
	background: #6c63ff;
	border: none;
	border-radius: 8px;
	color: white;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 4px 6px rgba(108, 99, 255, 0.3);
}

button[type="submit"]:hover {
	background: #5a51e6;
}

.modal-overlay {
	background: rgba(17, 17, 17, 0.95);
	backdrop-filter: blur(4px);
}

.modal-content {
	background: #2d2d2d;
	border-radius: 12px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	padding: 30px;
}

.modal-content h2 {
	color: #e0e0e0;
}

.modal-content p {
	color: #bdbdbd;
}

.close-btn {
	background: #6c63ff;
	padding: 8px 20px;
	border-radius: 6px;
	transition: all 0.2s ease;
}

.close-btn:hover {
	background: #5a51e6;
}

.error {
	background: #3a1d1d;
	color: #ff8a8a;
	padding: 12px;
	border-radius: 6px;
	border: 1px solid #ff6b6b;
	margin-top: 15px;
}

button[type="submit"] {
	padding: 10px 15px;
	color: white;
	border: none;
	cursor: pointer;
}
button[type="submit"]:hover {
	background-color: #372188;
}
</style>
