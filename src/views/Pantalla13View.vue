<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";
import axios from "axios";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";

import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";

const store = useFormularioStore();
const router = useRouter();

const departments = ref([]);
const paises = ref([]);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");

const genero = ref(""); // Refs para almacenar los valores de los campos
const estadoCivil = ref("");
const fechaNacimiento = ref("");
const paisSeleccionado = ref("");
const departamentoSeleccionado = ref("");
const maxFechaNacimiento = ref("");

const handleSubmit = (event) => {
  if (
    !genero.value ||
    !estadoCivil.value ||
    !fechaNacimiento.value ||
    !paisSeleccionado.value ||
    !departamentoSeleccionado.value
  ) {
    // Evitar el envío del formulario si no es válido
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor completa todos los campos.";
    setTimeout(() => {
      mensajeAlerta.value = "";
    }, 3000);
    return;
  }

  const fechaNacimientoDate = new Date(fechaNacimiento.value);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
  const mesDiferencia = fechaActual.getMonth() - fechaNacimientoDate.getMonth();
  const diaDiferencia = fechaActual.getDate() - fechaNacimientoDate.getDate();

  if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
    edad--;
  }

  if (edad < 18) {
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Debes ser mayor de edad para continuar";
    return;
  }

  event.preventDefault();
  mensajeAlerta.value = false;
  store.completarFormulario(); // Marca el formulario como completado
  router.push("/datosPersonales2"); // Redirige a la siguiente pantalla
};

onMounted(async () => {
  const hoy = new Date();
  hoy.setFullYear(hoy.getFullYear() - 18); // Restar 18 años a la fecha actual
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0"); // Mes actual (0-11)
  const dd = String(hoy.getDate()).padStart(2, "0"); // Día actual (1-31)
  maxFechaNacimiento.value = `${yyyy}-${mm}-${dd}`; // Formato YYYY-MM-DD
  // Cargar los países y departamentos al montar el componente
 /*  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const listaPaises = response.data.map((pais) => ({
      value: pais.cca2,
      label: pais.name.common,
    }));

    // Encontrar Colombia y moverla al principio de la lista
    const indiceColombia = listaPaises.findIndex((pais) => pais.value === "CO");
    if (indiceColombia !== -1) {
      const colombia = listaPaises.splice(indiceColombia, 1)[0];
      listaPaises.unshift(colombia); // Añadir Colombia al principio
    }

    paises.value = listaPaises;
  } catch (error) {
    console.error("Error al cargar países:", error);
  } */

  try {
    const response = await axios.get(
      "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento&$order=departamento"
    );
    departments.value = response.data.map((item) => ({
      value: item.departamento,
      label: item.departamento,
    }));
  } catch (err) {
    console.error("Error loading departments:", err);
  }
  let miRuta = window.location.pathname;
  // Validar si ya existe "ruta"
  if (localStorage.getItem.length > 0) {
    localStorage.removeItem("ruta");

    // Setear la ruta por defecto
    localStorage.setItem("ruta", miRuta);
  } else {
    // Setear la ruta por defecto
    localStorage.setItem("ruta", miRuta);
  }
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
          <label for="genero">Género</label>
          <div class="custom-select-wrapper">
            <select v-model="genero" name="genero" class="custom-select">
              <option selected disabled value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <label for="estadoCivil">Estado civil</label>
          <div class="custom-select-wrapper">
            <select
              v-model="estadoCivil"
              name="estadoCivil"
              class="custom-select"
            >
              <option selected disabled value="">Seleccione</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="unionLibre">Unión Libre (o Concubinato)</option>
              <option value="separado">Separado</option>
            </select>
          </div>

          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <div class="custom-date">
            <input
              v-model="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              class="custom-input-date"
              :max="maxFechaNacimiento"
            />
          </div>

        <label for="paisNacimiento">País de Nacimiento</label>
        <div class="custom-select-wrapper">
          <select v-model="paisSeleccionado" class="custom-select" name="pais">
            <option selected disabled value="">Selecciona tu país</option>
            <option value="colombia">Colombia</option> 
          </select>
        </div>

          <label for="departamento">Departamento</label>
          <div class="custom-select-wrapper">
            <select
              v-model="departamentoSeleccionado"
              class="custom-select"
              name="departamento"
            >
              <option value="colombia">Colombia</option>
            </select>
          </div>
          <Button @click="handleSubmit" class="mt-5"></Button>
          <p v-if="mostrarAlerta" class="text-danger mt-1 flex justify-center">
            {{ mensajeAlerta }}
          </p>
        </div>
      </form>
      <Footer class="bottom-0 left-0 right-0"></Footer>
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

.form-group button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: #fff;
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  outline: none;
  align-items: center;
  text-align: center;
  overflow: hidden;
  border: none;
  transform: translate3d(0, 0, 0);
}

.custom-date {
  position: relative;
  margin-bottom: 24px;
  width: 100%;
}

.custom-input-date {
  appearance: none;
  border: none;
  border-bottom: 2px solid #09008be1;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 0;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
}

.custom-input-date:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}

.custom-input-date::-webkit-calendar-picker-indicator {
  color: #495057;
  cursor: pointer;
}

.custom-input-date::-moz-focus-inner {
  border: 0;
  padding: 0;
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
