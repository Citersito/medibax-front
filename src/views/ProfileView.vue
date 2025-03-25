<template>
  <div class="edit-paciente-container">
    <form class="edit-paciente-form" @submit.prevent="updatePaciente">
      <h1>Editar Paciente</h1>
      <input v-model="paciente.nombre" type="text" placeholder="Nombre" required>
      <input v-model="paciente.nombre_segundo" type="text" placeholder="Segundo Nombre">
      <input v-model="paciente.apellido_paterno" type="text" placeholder="Apellido Paterno" required>
      <input v-model="paciente.apellido_materno" type="text" placeholder="Apellido Materno">
      <input v-model="paciente.curp" type="text" placeholder="CURP">
      <input v-model="paciente.telefono" type="text" placeholder="Teléfono">
      <input v-model="paciente.direccion" type="text" placeholder="Dirección">
      <input v-model="paciente.estado" type="text" placeholder="Estado">
      <input v-model="paciente.ciudad" type="text" placeholder="Ciudad">
      <input v-model="paciente.estado_civil" type="text" placeholder="Estado Civil">
      <input v-model="paciente.ocupacion" type="text" placeholder="Ocupación">
      <button type="submit">Actualizar</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '../services/api'

export default {
  setup() {
    const paciente = ref({
      nombre: '',
      nombre_segundo: '',
      apellido_paterno: '',
      apellido_materno: '',
      curp: '',
      telefono: '',
      direccion: '',
      estado: '',
      ciudad: '',
      estado_civil: '',
      ocupacion: '',
      usuario_id: 0
    })
    const error = ref(null)

    onMounted(async () => {
      const id = localStorage.getItem('user_id')
      if (id) {
        try {
          const response = await axios.get(`/expediente/paciente/${id}`)
          paciente.value = response.data
        } catch (err) {
          console.error(err)
          error.value = 'Error al cargar los datos del paciente'
        }
      } else {
        console.error('ID de paciente no definido')
        error.value = 'ID de paciente no definido'
      }
    })

    const updatePaciente = async () => {
      const id = localStorage.getItem('user_id')
      if (id) {
        try {
          await axios.put(`/expediente/paciente/${id}`, paciente.value)
          error.value = 'Paciente actualizado exitosamente'
        } catch (err) {
          console.error(err)
          error.value = 'Error al actualizar el paciente'
        }
      } else {
        console.error('ID de paciente no definido')
        error.value = 'ID de paciente no definido'
      }
    }

    return {
      paciente,
      error,
      updatePaciente
    }
  }
}
</script>