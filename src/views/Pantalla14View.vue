<script setup>
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from '../stores/formStore.js';

const store = useFormularioStore();
const router = useRouter();
const formStore = useFormStore();

const nivelEducativo = ref(""); 
const estrato = ref("");
const grupoEtnico = ref("");
const declarasRenta = ref("");
const rut = ref("");
const mensajeAlerta = ref("");
const mostrarAlerta = ref(false);

const handleSubmit = (event) => {
  event.preventDefault(); // evitar comportamiento por defecto desde el inicio

  if (
    !nivelEducativo.value ||
    !estrato.value ||
    !grupoEtnico.value ||
    !declarasRenta.value ||
    !rut.value
  ) {
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor completa todos los campos.";
    setTimeout(() => {
      mensajeAlerta.value = "";
      mostrarAlerta.value = false;
    }, 3000);
    return;
  }

  // Guardar todos los datos correctamente
  formStore.updateField('Nivel_Educativo', nivelEducativo.value);
  formStore.updateField('Estrato', estrato.value);
  formStore.updateField('Grupo_Etnico', grupoEtnico.value);
  formStore.updateField('Declara_Renta', declarasRenta.value === "si" ? 1 : 0);
  formStore.updateField('Esta_obligado_a_tener_RUT_por_tu_actividad_economica', rut.value === "si" ? 1 : 0);

  mensajeAlerta.value = "";
  mostrarAlerta.value = false;

  store.completarFormulario();
  router.push("/negocio");
};

onMounted(() => {
  const miRuta = window.location.pathname;

  // Corregido: validación correcta del localStorage
  if (localStorage.getItem("ruta")) {
    localStorage.removeItem("ruta");
  }

  localStorage.setItem("ruta", miRuta);
});
</script>


<template>
  <Heading></Heading>
  <motion.div v-bind="fadeInUp">
    <h2 class="titulo">Datos Personales</h2>
    <!-- Select de generos -->
    <section class="h-[100vh] flex flex-col justify-between overflow-hidden">
      <form>
        <div class="form-group">
          <label for="nivel educativo">Nivel Educativo</label>
          <div class="custom-select-wrapper">
            <select
              v-model="nivelEducativo"
              name="nivelEducativo"
              class="custom-select"
            >
              <option selected disabled value="">Seleccione</option>
              <option value="basico">Básico Primaria</option>
              <option value="bachillerato">Bachillerato</option>
              <option value="tecnico">Técnico</option>
              <option value="tecnologo">Tecnólogo</option>
              <option value="profesional">Profesional</option>
              <option value="posgrado">Posgrado</option>
            </select>
          </div>
          <label for="estrato">Estrato</label>
          <div class="custom-select-wrapper">
            <select v-model="estrato" name="estrato" class="custom-select">
              <option selected disabled value="">Seleccione</option>
              <option value="1">Estrato 1</option>
              <option value="2">Estrato 2</option>
              <option value="3">Estrato 3</option>
              <option value="4">Estrato 4</option>
              <option value="5">Estrato 5</option>
              <option value="6">Estrato 6</option>
            </select>
          </div>
          <label for="grupo etnico">Grupo Étnico</label>
          <div class="custom-select-wrapper">
            <select
              v-model="grupoEtnico"
              name="grupoEtnico"
              class="custom-select"
            >
              <option selected disabled value="">Seleccione</option>
              <option value="afrocolombiano">Afrocolombiano</option>
              <option value="indigena">Indígena</option>
              <option value="raizal">Raizal</option>
              <option value="palenquero">Palenquero</option>
              <option value="gitano">Gitano</option>
              <option value="ninguno">Ninguno</option>

              <option value="otro">Otro</option>
            </select>
          </div>
          <label for="declaraRenta">¿Declara Renta?</label>
          <div class="custom-select-wrapper">
            <select
              v-model="declarasRenta"
              name="declarasRenta"
              class="custom-select"
            >
              <option selected disabled value="">Seleccione</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <label for="rut"
            >¿Esta obligado a tener RUT por tu actividad económica?</label
          >
          <div class="custom-select-wrapper">
            <select v-model="rut" name="Rut" class="custom-select">
              <option selected disabled value="">Seleccione</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <Button @click="handleSubmit" class="mt-5"></Button>
          <p v-if="mostrarAlerta" class="text-danger mt-1 flex justify-center">
            {{ mensajeAlerta }}
          </p>
        </div>
      </form>
      <Footer></Footer>
    </section>
  </motion.div>
</template>

<style scoped>
.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 30px 8px 0;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23495057" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E');
  background-position: right 12px center;
  background-size: 16px 12px;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
  cursor: pointer;
}

.custom-select:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-group label:not(:first-child) {
  margin-top: 16px;
}

.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #09008be1;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 30px 8px 0;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23495057" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E');
  background-position: right 12px center;
  background-size: 16px 12px;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
  cursor: pointer;
}

.custom-select:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}

.form-group {
  margin-left: 20px;
  margin-right: 20px;
}

.titulo {
  margin: 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}

@media (max-width: 767px) {
}
</style>
