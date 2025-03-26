<template>
  <div class="dashboard">
    <h1>Dashboard de MediBand</h1>
    <div class="cards">
      <div class="card" v-for="metric in metrics" :key="metric.id">
        <h2>{{ metric.name }}</h2>
        <p>{{ metric.value }}</p>
        <!-- Progress Bar Example -->
        <div class="progress-bar">
          <div class="progress" :style="{ width: metric.progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      // Example metrics with a progress value (0-100) for progress bars.
      metrics: [
        { id: 1, name: "Latencia Cardiaca", value: "72 ms", progress: 70 },
        { id: 2, name: "Latidos por minuto", value: "80 BPM", progress: 80 },
        { id: 3, name: "Horas de sueño", value: "7 hrs", progress: 50 },
        { id: 4, name: "Saturación de Oxigeno", value: "98%", progress: 90 },
        { id: 5, name: "Temperatura", value: "36.5 °C", progress: 65 },
        { id: 6, name: "Presión Sanguínea", value: "120/80", progress: 75 },
        { id: 7, name: "Pasos", value: "10,000", progress: 85 },
        { id: 8, name: "KCal", value: "500 KCal", progress: 60 },
      ],
      charts: [1, 2], // Placeholders for additional chart canvases
      circles: [1, 2], // Placeholders for circular charts
    };
  },
  mounted() {
    // Initialize your charts here using your preferred charting library (e.g., Chart.js)
    // Example:
    // this.charts.forEach((chart, index) => { initializeChart('chart' + index, ...); });
    // this.circles.forEach((circle, index) => { initializeCircleChart('circle' + index, ...); });
  },
};
</script>

<style scoped>
/* Container for Sidebar and Main Content */
.container {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: #e0e0e0;
  font-family: "Roboto", sans-serif;
}

/* Dashboard Main Content */
.dashboard {
  flex: 1;
  padding: 20px;
  margin-left: 0;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
  transition: margin-left 0.3s;
}

/* Desktop styles */
@media (min-width: 768px) {
  .dashboard {
    margin-left: 250px;
    width: calc(100% - 250px);
    padding: 20px 40px;
  }
}

/* Tablet landscape */
@media (max-width: 1024px) {
  .dashboard {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
}

/* Mobile & Tablet portrait */
@media (max-width: 767px) {
  .dashboard {
    margin-left: 0;
    width: 100%;
    padding: 15px;
  }

  .cards {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }

  .card h2 {
    font-size: 1.2rem;
  }

  .card p {
    font-size: 1.5rem;
  }
}

.dashboard h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #bb86fc;
  font-size: 2.5rem;
}

/* Cards Section */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #bb86fc;
}

.card p {
  font-size: 1.8rem;
  margin: 0 0 15px 0;
  font-weight: bold;
  color: #ffffff;
}

/* Progress Bar Styles */
.progress-bar {
  background-color: #333;
  border-radius: 5px;
  height: 10px;
  margin-top: 10px;
}

.progress {
  background-color: #bb86fc;
  height: 100%;
  border-radius: 5px;
}
</style>
