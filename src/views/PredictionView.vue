<template>
  <div class="predict-container">
    <h1>Predicción de Enfermedades</h1>
    <form @submit.prevent="predictDisease">
      <div v-for="(value, key) in symptoms" :key="key" class="form-group">
        <label :for="key">{{ key.replace(/_/g, ' ') }}</label>
        <input v-model="symptoms[key]" :id="key" type="number" min="0" max="1" />
      </div>
      <button type="submit">Predecir</button>
    </form>
    <div v-if="prediction" class="prediction-result">
      <h2>Predicción:</h2>
      <p>{{ prediction }}</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from '../services/api';

export default {
  data() {
    return {
      symptoms: {
        age: 35,
        sex: 'M',
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
        symptom_duration_days: 3
      },
      prediction: null,
      error: null
    };
  },
  methods: {
    async predictDisease() {
      try {
        const response = await axios.post('/api/ai/predict', this.symptoms);
        this.prediction = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Error al realizar la predicción';
        this.prediction = null;
      }
    }
  }
};
</script>

<style>
.predict-container {
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
.error {
  color: red;
  margin-top: 10px;
}
.prediction-result {
  margin-top: 20px;
}
</style>