<template>
  <div class="expediente-admin-container">
    <h1>Expediente Médico</h1>

    <!-- Mostrar información del paciente -->
    <div class="paciente-info">
      <h2>Informacion general.</h2>
      <p><strong>Nombre:</strong> {{ paciente.nombre }}</p>
      <p><strong>Segundo Nombre:</strong> {{ paciente.nombre_segundo }}</p>
      <p><strong>Apellido Paterno:</strong> {{ paciente.apellido_paterno }}</p>
      <p><strong>Apellido Materno:</strong> {{ paciente.apellido_materno }}</p>
      <p><strong>CURP:</strong> {{ paciente.curp }}</p>
      <p><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
      <p><strong>Dirección:</strong> {{ paciente.direccion }}</p>
      <p><strong>Estado:</strong> {{ paciente.estado }}</p>
      <p><strong>Ciudad:</strong> {{ paciente.ciudad }}</p>
      <p><strong>Estado Civil:</strong> {{ paciente.estado_civil }}</p>
      <p><strong>Ocupación:</strong> {{ paciente.ocupacion }}</p>
    </div>

    <!-- Antesendetes Personales No Patologicos-->
    <span>-</span>
    <div class="paciente-info">
      <h2>Antecedentes Personales No Patologicos</h2>
      <p>
        <strong>Hábitos alimenticios:</strong> {{ paciente.habito_alimenticio }}
      </p>
      <p><strong>Actividad física:</strong> {{ paciente.actividad_fisica }}</p>
      <p>
        <strong>Consumo de sustancias (tabaco, alcohol, drogas):</strong>
        {{ paciente.consumo_sustancias }}
      </p>
      <p><strong>Inmunizaciones:</strong> {{ paciente.inmunizaciones }}</p>
      <p>
        <strong>Condiciones de vivienda y entorno:</strong>
        {{ paciente.condiciones_vivienda }}
      </p>
    </div>

    <!-- Antesendetes Personales Patologicos-->
    <span>-</span>
    <div class="paciente-info">
      <h2>Antecedentes Personales Patologicos</h2>
      <p>
        <strong>Enfermedades previas y crónicas:</strong> {{ paciente.ninguna }}
      </p>
      <p>
        <strong>Cirugías y procedimientos:</strong>
        {{ paciente.ninguna }}
      </p>
      <p>
        <strong>Alergias (medicamentos, alimentos, ambientales):</strong>
        {{ paciente.ninguna }}
      </p>
      <p><strong>Hospitalizaciones:</strong> {{ paciente.ninguna }}</p>
      <p><strong>Transfusiones:</strong> {{ paciente.ninguna }}</p>
    </div>

    <!-- Antesendetes HeredoFamiliares-->
    <span>-</span>
    <div class="paciente-info">
      <h2>Antecedentes HeredoFamiliares</h2>
      <p>
        <strong>Enfermedades crónicas en familiares directos:</strong>
        {{ paciente.ninguna }}
      </p>
      <p>
        <strong>Historial de enfermedades genéticas:</strong>
        {{ paciente.ninguna }}
      </p>
    </div>

    <!-- Mostrar errores -->
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
      habito_alimenticio: "Balanceado",
      actividad_fisica: "Alta",
      consumo_sustancias: "Ninguna",
      inmunizaciones: "Ninguna",
      condiciones_vivienda: "Buenas",
      ninguna: "Ninguna",
      id_usuario: localStorage.getItem("user_id"), // Obtiene el ID del usuario logueado
    });
    const expedientes = ref([]);
    const antecedentesFamiliares = ref([]);
    const antecedentesPersonales = ref([]);
    const historiasClinicas = ref([]);
    const modificacionesExpediente = ref([]);
    const expedienteEditId = ref(null);
    const antecedenteFamiliarEditId = ref(null);
    const antecedentePersonalEditId = ref(null);
    const historiaClinicaEditId = ref(null);
    const modificacionEditId = ref(null);
    const error = ref(null);

    onMounted(async () => {
      try {
        const id = localStorage.getItem("user_id");
        if (id) {
          const pacienteResponse = await axios.get(
            `/expediente/paciente/${id}`
          );
          paciente.value = { ...paciente.value, ...pacienteResponse.data };

          const expedientesResponse = await axios.get("/expediente/expediente");
          expedientes.value = expedientesResponse.data;

          const antecedentesFamiliaresResponse = await axios.get(
            "/expediente/antecedente_familiar"
          );
          antecedentesFamiliares.value = antecedentesFamiliaresResponse.data;

          const antecedentesPersonalesResponse = await axios.get(
            "/expediente/antecedente_personal"
          );
          antecedentesPersonales.value = antecedentesPersonalesResponse.data;

          const historiasClinicasResponse = await axios.get(
            "/expediente/historia_clinica"
          );
          historiasClinicas.value = historiasClinicasResponse.data;

          const modificacionesResponse = await axios.get(
            "/expediente/modificacion"
          );
          modificacionesExpediente.value = modificacionesResponse.data;
        } else {
          error.value = "ID de usuario no definido";
        }
      } catch (err) {
        console.error(err);
        error.value = "Error al cargar los datos";
      }
    });

    const saveExpediente = async (id_expediente) => {
      try {
        if (id_expediente) {
          await axios.put(
            `/expediente/expediente/${id_expediente}`,
            expedientes.value.find((exp) => exp.id_expediente === id_expediente)
          );
        } else {
          const id = localStorage.getItem("user_id");
          if (id) {
            await axios.post("/expediente/expediente", {
              id_paciente: paciente.value.id_paciente,
              descripcion: expedientes.value.find(
                (exp) => exp.id_expediente === null
              ).descripcion,
            });
            const expedientesResponse = await axios.get(
              "/expediente/expediente"
            );
            expedientes.value = expedientesResponse.data;
          } else {
            error.value = "ID de usuario no definido";
          }
        }
        expedienteEditId.value = null;
      } catch (err) {
        console.error(err);
        error.value = `Error al ${
          id_expediente ? "actualizar" : "crear"
        } el expediente`;
      }
    };

    const deleteExpediente = async (id_expediente) => {
      try {
        await axios.delete(`/expediente/expediente/${id_expediente}`);
        expedientes.value = expedientes.value.filter(
          (exp) => exp.id_expediente !== id_expediente
        );
      } catch (err) {
        console.error(err);
        error.value = "Error al eliminar el expediente";
      }
    };

    const editExpediente = (id_expediente) => {
      expedienteEditId.value = id_expediente;
    };

    const addExpediente = () => {
      expedienteEditId.value = null;
      expedientes.value.push({ id_expediente: null, descripcion: "" });
    };

    const saveAntecedenteFamiliar = async (id_antecedente_familiar) => {
      try {
        if (id_antecedente_familiar) {
          await axios.put(
            `/expediente/antecedente_familiar/${id_antecedente_familiar}`,
            antecedentesFamiliares.value.find(
              (ant) => ant.id_antecedente_familiar === id_antecedente_familiar
            )
          );
        } else {
          const id = localStorage.getItem("user_id");
          if (id) {
            await axios.post("/expediente/antecedente_familiar", {
              id_paciente: paciente.value.id_paciente,
              descripcion: antecedentesFamiliares.value.find(
                (ant) => ant.id_antecedente_familiar === null
              ).descripcion,
            });
            const antecedentesFamiliaresResponse = await axios.get(
              "/expediente/antecedente_familiar"
            );
            antecedentesFamiliares.value = antecedentesFamiliaresResponse.data;
          } else {
            error.value = "ID de usuario no definido";
          }
        }
        antecedenteFamiliarEditId.value = null;
      } catch (err) {
        console.error(err);
        error.value = `Error al ${
          id_antecedente_familiar ? "actualizar" : "crear"
        } el antecedente familiar`;
      }
    };

    const deleteAntecedenteFamiliar = async (id_antecedente_familiar) => {
      try {
        await axios.delete(
          `/expediente/antecedente_familiar/${id_antecedente_familiar}`
        );
        antecedentesFamiliares.value = antecedentesFamiliares.value.filter(
          (ant) => ant.id_antecedente_familiar !== id_antecedente_familiar
        );
      } catch (err) {
        console.error(err);
        error.value = "Error al eliminar el antecedente familiar";
      }
    };

    const editAntecedenteFamiliar = (id_antecedente_familiar) => {
      antecedenteFamiliarEditId.value = id_antecedente_familiar;
    };

    const addAntecedenteFamiliar = () => {
      antecedenteFamiliarEditId.value = null;
      antecedentesFamiliares.value.push({
        id_antecedente_familiar: null,
        descripcion: "",
      });
    };

    const saveAntecedentePersonal = async (id_antecedente_personal) => {
      try {
        if (id_antecedente_personal) {
          await axios.put(
            `/expediente/antecedente_personal/${id_antecedente_personal}`,
            antecedentesPersonales.value.find(
              (ant) => ant.id_antecedente_personal === id_antecedente_personal
            )
          );
        } else {
          const id = localStorage.getItem("user_id");
          if (id) {
            await axios.post("/expediente/antecedente_personal", {
              id_paciente: paciente.value.id_paciente,
              descripcion: antecedentesPersonales.value.find(
                (ant) => ant.id_antecedente_personal === null
              ).descripcion,
            });
            const antecedentesPersonalesResponse = await axios.get(
              "/expediente/antecedente_personal"
            );
            antecedentesPersonales.value = antecedentesPersonalesResponse.data;
          } else {
            error.value = "ID de usuario no definido";
          }
        }
        antecedentePersonalEditId.value = null;
      } catch (err) {
        console.error(err);
        error.value = `Error al ${
          id_antecedente_personal ? "actualizar" : "crear"
        } el antecedente personal`;
      }
    };

    const deleteAntecedentePersonal = async (id_antecedente_personal) => {
      try {
        await axios.delete(
          `/expediente/antecedente_personal/${id_antecedente_personal}`
        );
        antecedentesPersonales.value = antecedentesPersonales.value.filter(
          (ant) => ant.id_antecedente_personal !== id_antecedente_personal
        );
      } catch (err) {
        console.error(err);
        error.value = "Error al eliminar el antecedente personal";
      }
    };

    const editAntecedentePersonal = (id_antecedente_personal) => {
      antecedentePersonalEditId.value = id_antecedente_personal;
    };

    const addAntecedentePersonal = () => {
      antecedentePersonalEditId.value = null;
      antecedentesPersonales.value.push({
        id_antecedente_personal: null,
        descripcion: "",
      });
    };

    const saveHistoriaClinica = async (id_historia_clinica) => {
      try {
        if (id_historia_clinica) {
          await axios.put(
            `/expediente/historia_clinica/${id_historia_clinica}`,
            historiasClinicas.value.find(
              (hist) => hist.id_historia_clinica === id_historia_clinica
            )
          );
        } else {
          const id = localStorage.getItem("user_id");
          if (id) {
            await axios.post("/expediente/historia_clinica", {
              id_paciente: paciente.value.id_paciente,
              motivo_consulta: historiasClinicas.value.find(
                (hist) => hist.id_historia_clinica === null
              ).motivo_consulta,
            });
            const historiasClinicasResponse = await axios.get(
              "/expediente/historia_clinica"
            );
            historiasClinicas.value = historiasClinicasResponse.data;
          } else {
            error.value = "ID de usuario no definido";
          }
        }
        historiaClinicaEditId.value = null;
      } catch (err) {
        console.error(err);
        error.value = `Error al ${
          id_historia_clinica ? "actualizar" : "crear"
        } la historia clínica`;
      }
    };

    const deleteHistoriaClinica = async (id_historia_clinica) => {
      try {
        await axios.delete(
          `/expediente/historia_clinica/${id_historia_clinica}`
        );
        historiasClinicas.value = historiasClinicas.value.filter(
          (hist) => hist.id_historia_clinica !== id_historia_clinica
        );
      } catch (err) {
        console.error(err);
        error.value = "Error al eliminar la historia clínica";
      }
    };

    const editHistoriaClinica = (id_historia_clinica) => {
      historiaClinicaEditId.value = id_historia_clinica;
    };

    const addHistoriaClinica = () => {
      historiaClinicaEditId.value = null;
      historiasClinicas.value.push({
        id_historia_clinica: null,
        motivo_consulta: "",
      });
    };

    const saveModificacion = async (id_modificacion) => {
      try {
        if (id_modificacion) {
          await axios.put(
            `/expediente/modificacion/${id_modificacion}`,
            modificacionesExpediente.value.find(
              (mod) => mod.id_modificacion === id_modificacion
            )
          );
        } else {
          const id = localStorage.getItem("user_id");
          if (id) {
            await axios.post("/expediente/modificacion", {
              id_expediente: expedientes.value.find(
                (exp) => exp.id_expediente !== null
              ).id_expediente,
              descripcion: modificacionesExpediente.value.find(
                (mod) => mod.id_modificacion === null
              ).descripcion,
            });
            const modificacionesResponse = await axios.get(
              "/expediente/modificacion"
            );
            modificacionesExpediente.value = modificacionesResponse.data;
          } else {
            error.value = "ID de usuario no definido";
          }
        }
        modificacionEditId.value = null;
      } catch (err) {
        console.error(err);
        error.value = `Error al ${
          id_modificacion ? "actualizar" : "crear"
        } la modificación del expediente`;
      }
    };

    const deleteModificacion = async (id_modificacion) => {
      try {
        await axios.delete(`/expediente/modificacion/${id_modificacion}`);
        modificacionesExpediente.value = modificacionesExpediente.value.filter(
          (mod) => mod.id_modificacion !== id_modificacion
        );
      } catch (err) {
        console.error(err);
        error.value = "Error al eliminar la modificación del expediente";
      }
    };

    const editModificacion = (id_modificacion) => {
      modificacionEditId.value = id_modificacion;
    };

    const addModificacion = () => {
      modificacionEditId.value = null;
      modificacionesExpediente.value.push({
        id_modificacion: null,
        descripcion: "",
      });
    };

    return {
      paciente,
      expedientes,
      antecedentesFamiliares,
      antecedentesPersonales,
      historiasClinicas,
      modificacionesExpediente,
      expedienteEditId,
      antecedenteFamiliarEditId,
      antecedentePersonalEditId,
      historiaClinicaEditId,
      modificacionEditId,
      error,
      saveExpediente,
      deleteExpediente,
      editExpediente,
      addExpediente,
      saveAntecedenteFamiliar,
      deleteAntecedenteFamiliar,
      editAntecedenteFamiliar,
      addAntecedenteFamiliar,
      saveAntecedentePersonal,
      deleteAntecedentePersonal,
      editAntecedentePersonal,
      addAntecedentePersonal,
      saveHistoriaClinica,
      deleteHistoriaClinica,
      editHistoriaClinica,
      addHistoriaClinica,
      saveModificacion,
      deleteModificacion,
      editModificacion,
      addModificacion,
    };
  },
};
</script>
