<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from '../stores/formStore.js';

const store = useFormularioStore();
const router = useRouter();

const departments = ref([]);
const cities = ref([]);
const selectedDepartment = ref(""); // Será el ID del departamento
const selectedCity = ref("");
const selectedDepartmentName = ref(""); // Nombre del departamento
const error = ref("");
const formStore = useFormStore();
const departmentsRaw = ref([]);
const selectedDepartmentId = ref(null);// solo los nombres
const citiesRaw = ref([]); 
const selectedCityId = ref(null);

// Cargar departamentos desde API Colombia
const loadDepartments = async () => {
  try {
    const response = await axios.get(
      "api/ubicacion/departamentos"
    );
        departmentsRaw.value = response.data;
    departments.value = response.data.map((item) => item.nombre);
  } catch (err) {
    error.value = "Error al cargar los departamentos.";
    console.error("Error al cargar los departamentos:", err);
  }
};

const handleDepartmentChange = () => {
  const dept = departmentsRaw.value.find(
    (d) => d.nombre === selectedDepartment.value
  );
  selectedDepartmentId.value = dept?.id || null;

  loadCities();
};

const handleCityChange = () => {
  const city = citiesRaw.value.find(
    (c) => c.nombre.trim().toLowerCase() === selectedCity.value.trim().toLowerCase()
  );
  selectedCityId.value = city?.id || null;

  console.log("Ciudad seleccionada:", selectedCity.value);
  console.log("ID de ciudad:", selectedCityId.value);
};

const loadCities = async () => {
  if (!selectedDepartmentId.value) return;
  try {
    const response = await axios.get(
      `api/ubicacion/ciudades/${selectedDepartmentId.value}`
    );
    citiesRaw.value = response.data;
    cities.value = response.data.map((item) => item.nombre);
  } catch (err) {
    error.value = "Error al cargar las ciudades.";
    console.error("Error al cargar las ciudades:", err);
  }
};

// Cargar ciudades cada vez que se seleccione un nuevo departamento
watch(selectedDepartment, (newVal) => {
  const dept = departments.value.find((d) => d.id === newVal);
  selectedDepartmentName.value = dept ? dept.name : "";
  loadCities();
});

// Manejar el envío del formulario
const handleSubmit = (event) => {
  if (!selectedDepartment.value || !selectedCity.value) {
    error.value = "Por favor, selecciona tu departamento y ciudad.";
    event.preventDefault(); // Evita el envío del formulario por defecto
    const selectedDepartment = document.querySelector('input[name="nevera"]:checked');
    const selectedCity = document.querySelector('input[name="nevera"]:checked');

    setTimeout(() => {
      error.value = "";
    }, 3000);
    return false;
  }

  // Guardar ciudad seleccionada en localStorage
  localStorage.setItem("selectedDepartment", selectedDepartment.value);
  localStorage.setItem("selectedCity", selectedCity.value);
  localStorage.setItem("selectedCityId", selectedCityId.value);


  error.value = "";

  // Redirigir a la nueva página
  event.preventDefault(); // Evitar el envío del formulario si no es válido
  store.completarFormulario(); // Marca el formulario como completado
  router.push("/ubicacion"); // Redirige a la siguiente pantalla
  formStore.updateField('Ubicacion_del_Negocio_Departamento', selectedDepartment.value);
  formStore.updateField('Ubicacion_del_Negocio_Ciudad', selectedCity.value);
  
};

// Inicialización
onMounted(() => {
  loadDepartments();

  const miRuta = window.location.pathname;
  if (localStorage.getItem("ruta")) {
    localStorage.removeItem("ruta");
  }
  localStorage.setItem("ruta", miRuta);
});
</script>


<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <section class="container registro h-[100vh] flex flex-col justify-between overflow-hidden p-0">
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

      <div class="select-option mt-5 p-5">
        <h3 class="mb-4 titulo-7">¿Cuéntanos dónde está tu negocio?</h3>
        <p class="mb-4 font-bold">Por norma es necesario que te hagamos esta pregunta</p>
        
        <p class="font-bold">Elige un departamento</p>
        <div class="custom-select-wrapper">
          <select
            v-model="selectedDepartment"
            @change="handleDepartmentChange"
            class="custom-select"
          >
            <option disabled value="">Elige un departamento</option>
            <option
              v-for="nombre in departments"
              :key="nombre"
              :value="nombre"
            >
              {{ nombre }}
            </option>
          </select>
        </div>

        <p class="font-bold">Elige una ciudad</p>
        <div class="custom-select-wrapper">
          <select v-model="selectedCity"  @change="handleCityChange" class="custom-select">
            <option disabled selected>Elige una ciudad</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <div class="p-5">
        <Button class="mt-5" @click="handleSubmit"></Button>
      </div>

      <p v-if="error" class="text-danger mt-1 flex justify-center">
        {{ error }}
      </p>
      <Footer />
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
