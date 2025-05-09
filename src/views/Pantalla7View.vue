<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";

const store = useFormularioStore();
const router = useRouter();
const departments = ref([]);
const cities = ref([]);
const selectedDepartment = ref(null);
const selectedCity = ref(null);
const error = ref("");

const loadDepartments = async () => {
  try {
    const response = await axios.get(
      "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento&$order=departamento"
    );
    departments.value = response.data.map((item) => item.departamento);
  } catch (err) {
    error.value = "Error al cargar los departamentos.";
    console.error("Error loading departments:", err);
  }
};

const loadCities = async () => {
  if (!selectedDepartment.value) return;
  try {
    const response = await axios.get(
      `https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&$where=departamento='${selectedDepartment.value}'&$order=municipio`
    );
    cities.value = response.data.map((item) => item.municipio);
  } catch (err) {
    error.value = "Error al cargar las ciudades.";
    console.error("Error loading cities:", err);
  }
};

const handleSubmit = (event) => {
  // Validación
  if (!selectedDepartment.value || !selectedCity.value) {
    error.value = "Por favor, selecciona tu departamento y ciudad.";
    event.preventDefault(); // Evita el envío del formulario por defecto

    setTimeout(() => {
      error.value = "";
    }, 3000);
    return false;
  }

  // Guardar ciudad seleccionada en localStorage
  localStorage.setItem("selectedCity", selectedCity.value);

  // Limpiar error si no lo hay
  error.value = "";

  // Redirigir a la nueva página
  event.preventDefault(); // Evitar el envío del formulario si no es válido
  store.completarFormulario(); // Marca el formulario como completado
  router.push("/ubicacion"); // Redirige a la siguiente pantalla
};

onMounted(() => {
  loadDepartments();
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
  <Heading />

  <section class="container py-5 registro">
    <div class="row align-items-center">
      <div class="col-lg-6 desktop">
        <picture>
          <img
            src="/public/pago.png"
            alt="Pago"
            class="img-fluid"
            loading="lazy"
            title="Pago"
          />
        </picture>
      </div>
    </div>
    <!-- Muestra la alerta solo si hay un error -->

    <div class="select-option mt-5">
      <h3 class="mb-4 titulo-7">¿Cuéntanos dónde está tu negocio?</h3>
      <p class="mb-4 font-bold">
        Por norma es necesario que te hagamos esta pregunta
      </p>
      <p class="font-bold">Elige un departamento</p>
      <div class="custom-select-wrapper">
        <select v-model="selectedDepartment" @change="loadCities" class="custom-select" >
          <option selected disabled >Seleccione</option>
          <option
            v-for="department in departments"
            :key="department"
            :value="department"
          >
            {{ department }}
          </option>
        </select>
      </div>
      <p class="font-bold">Elige una ciudad</p>
      <div class="custom-select-wrapper">
        <select v-model="selectedCity" name="ciudad" class="custom-select">
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
    </div>

    <Button class="mt-5" @click="handleSubmit"></Button>

    <p v-if="error" class="text-danger mt-1 flex justify-center">
      {{ error }}
    </p>
  </section>
  <Footer class="absolute bottom-0 left-0 right-0" />
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

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #111;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}

.form-select:focus {
  border-color: #80bdff;
  outline: 0;
  color: #111;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.titulo-7 {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-top: -50px;
}

.form-group input {
  background-color: transparent;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: #09008be1;
  border-radius: 0;
  box-sizing: border-box;
  color: rgb(17, 17, 17);
  caret-color: currentColor;
  display: block;
  margin: 0;
  padding: 8px 0;
  text-align: left;
  outline: none;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container button {
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

.container {
  background-color: white;
  color: #111;
  padding: 20px;
}

.parrafo {
  font-size: medium;
}

.info-banner {
  font-family: Graphik-Medium, Graphik-Regular, "Gotham SSm A", "Gotham SSm B",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0 0 12px;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}

.h5 {
  font-weight: bold;
}

p {
  color: black;
  font-size: 1rem;
}

.checklist {
  max-width: 300px;
  margin-top: 30px;
  margin: 0 auto;
}

.titulo {
  font-weight: bold;
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
}

.check-item input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 10px;
  position: relative;
}

.check-item input[type="checkbox"]:checked + .checkmark {
  background-color: #dd3590;
  border: 2px solid #dd3590;
}

.check-item input[type="checkbox"]:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  display: block;
}

@media (max-width: 767px) {
  .desktop {
    display: none;
  }
  .titulo {
    font-weight: bold;
  }
  .tarjeta {
    background-color: rgb(255, 255, 255);
    padding: 24px;
    border-radius: 16px;
    width: 100%;
  }
}
</style>
