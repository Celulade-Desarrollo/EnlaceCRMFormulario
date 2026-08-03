<script setup>
import { ref, onMounted } from "vue";
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
const formStore = useFormStore();

// Departamentos
const departments = ref([]);
const departmentsRaw = ref([]);
const selectedDepartment = ref("");
const selectedDepartmentId = ref(null);
const departmentSearch = ref("");
const filteredDepartments = ref([]);
const showDepartments = ref(false);

// Ciudades
const cities = ref([]);
const citiesRaw = ref([]);
const selectedCity = ref("");
const selectedCityId = ref(null);
const citySearch = ref("");
const filteredCities = ref([]);
const showCities = ref(false);

// Barrios
const barriosRaw = ref([]);
const barrios = ref([]);
const barriosFiltrados = ref([]);
const selectedBarrio = ref("");
const selectedBarrioId = ref(null);
const buscarBarrio = ref("");
const mostrarBarrios = ref(false);

// Dirección
const direccion = ref("");

const error = ref("");
const id = localStorage.getItem("Id");
const token = ref(localStorage.getItem('token'));

const loadDepartments = async () => {
  try {
    const response = await axios.get("/api/ubicacion/departamentos");
    departmentsRaw.value = response.data;

    let sorted = response.data.sort((a, b) => 
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base"})
    );
    const antioquiaIndex = sorted.findIndex(d => d.nombre === "ANTIOQUIA");
    if (antioquiaIndex !== -1){
      const [antioquia] = sorted.splice(antioquiaIndex, 1);
      sorted.unshift(antioquia);
    }

    departments.value = sorted.map(item => item.nombre);
    filteredDepartments.value = departments.value;
  } catch (err) {
    error.value = "Error al cargar los departamentos.";
    console.error(err);
  }
};

// Cargar Ciudades
const loadCities = async (departmentId) => {
  if (!departmentId) return;
  try {
    const response = await axios.get(`/api/ubicacion/ciudades/${departmentId}`);
    citiesRaw.value = response.data;

    let sorted = response.data.sort((a, b) => 
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base"})
    );

    const medellinIndex = sorted.findIndex(c => c.nombre === "MEDELLIN");
    if (medellinIndex !== -1){
      const [medellin] = sorted.splice(medellinIndex, 1);
      sorted.unshift(medellin);
    }

    cities.value = sorted.map(c => c.nombre);
    filteredCities.value = cities.value;
  } catch (err) {
    error.value = "Error al cargar las ciudades.";
    console.error(err);
  }
};

// Cargar Barrios basados en la Ciudad
const loadBarrios = async (cityId) => {
  if (!cityId) return;
  try {
    const response = await axios.get(`/api/ubicacion/barrios/${cityId}`);
    barriosRaw.value = response.data;

    let sorted = response.data.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );

    barrios.value = sorted.map(b => b.nombre);
    barriosFiltrados.value = barrios.value;
  } catch (err) {
    error.value = "Error al cargar los barrios.";
    console.error(err);
  }
};

// Filtros y Selecciones
const filterDepartments = (input) => {
  filteredDepartments.value = departments.value.filter(d =>
    d.toLowerCase().includes(input.toLowerCase())
  );
};

const selectDepartment = (dept) => {
  selectedDepartment.value = dept;
  departmentSearch.value = dept;
  showDepartments.value = false;

  const deptObj = departmentsRaw.value.find(d => d.nombre === dept);
  selectedDepartmentId.value = deptObj?.id || null;

  // Resetear Hijos
  selectedCity.value = "";
  citySearch.value = "";
  selectedCityId.value = null;
  filteredCities.value = [];
  
  selectedBarrio.value = "";
  buscarBarrio.value = "";
  selectedBarrioId.value = null;
  barriosFiltrados.value = [];

  loadCities(selectedDepartmentId.value);
};

const filterCities = (input) => {
  filteredCities.value = cities.value.filter(c =>
    c.toLowerCase().includes(input.toLowerCase())
  );
};

const selectCity = (city) => {
  selectedCity.value = city;
  citySearch.value = city;
  showCities.value = false;

  const cityObj = citiesRaw.value.find(c => c.nombre.trim().toLowerCase() === city.trim().toLowerCase());
  selectedCityId.value = cityObj?.id || null;

  // Resetear y cargar Barrios
  selectedBarrio.value = "";
  buscarBarrio.value = "";
  selectedBarrioId.value = null;
  barriosFiltrados.value = [];
  
  loadBarrios(selectedCityId.value);
};

const filtrarBarrios = (input) => {
  const texto = input.trim().toLowerCase();
  if (!texto) {
    barriosFiltrados.value = barrios.value;
  } else {
    barriosFiltrados.value = barrios.value.filter(b =>
      b.toLowerCase().includes(texto)
    );
  }
};

const selectBarrio = (nombre) => {
  selectedBarrio.value = nombre;
  buscarBarrio.value = nombre;
  mostrarBarrios.value = false;

  const barrioObj = barriosRaw.value.find(
    b => b.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
  );
  selectedBarrioId.value = barrioObj?.id || null;
};

// Manejar envío del formulario
const handleSubmit = async(event) => {
  event.preventDefault();

  if (!selectedDepartment.value || !selectedCity.value || !selectedBarrio.value || !direccion.value.trim()) {
    error.value = "Por favor, completa todos los campos";
    setTimeout(() => error.value = "", 3000);
    return false;
  }

  // Guardar en LocalStorage
  localStorage.setItem("selectedDepartment", selectedDepartment.value);
  localStorage.setItem("selectedCity", selectedCity.value);
  localStorage.setItem("selectedCityId", selectedCityId.value);
  localStorage.setItem("selectedBarrio", selectedBarrio.value);
  localStorage.setItem("direccion", direccion.value);

  error.value = "";
  
  // Actualizar Stores
  formStore.updateField('Ubicacion_del_Negocio_Departamento', selectedDepartment.value);
  formStore.updateField('Ubicacion_del_Negocio_Ciudad', selectedCity.value);
  formStore.updateField('Barrio', selectedBarrio.value);
  formStore.updateField('Direccion', direccion.value);

  try {
    await axios.patch(`/api/flujoRegistroEnlace/${id}`, {
      Ubicacion_del_Negocio_Departamento: selectedDepartment.value,
      Ubicacion_del_Negocio_Ciudad: selectedCity.value,
      Barrio: selectedBarrio.value,
      Direccion: direccion.value
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });  
  } catch (error) {
    console.error("Error:", error);
  }
  try {
      await axios.put(`/api/flujoRegistroEnlace/estado/pendiente/${id}`, {
        Estado: "IncompletoBloqUbiNegocio",
      }, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  store.completarFormulario();
  router.push("/informacionNegocio"); 
};

onMounted(async () => {
  await loadDepartments();
  
  const miRuta = window.location.pathname;
  localStorage.setItem("ruta", miRuta);

  const deptoGuardado = localStorage.getItem("departamento"); 
  const ciudadGuardada = localStorage.getItem("ciudad");

  if (deptoGuardado) {
    // Buscamos el objeto real para sacar el ID
    const deptObj = departmentsRaw.value.find(
      d => d.nombre.trim().toUpperCase() === deptoGuardado.trim().toUpperCase()
    );

    if (deptObj) {
      selectedDepartment.value = deptObj.nombre;
      departmentSearch.value = deptObj.nombre;
      selectedDepartmentId.value = deptObj.id;

      // 3. Cargamos las ciudades asociadas a este ID de departamento de forma asíncrona
      await loadCities(deptObj.id);

      if (ciudadGuardada) {
        // Buscamos el objeto de la ciudad real para sacar su ID
        const cityObj = citiesRaw.value.find(
          c => c.nombre.trim().toUpperCase() === ciudadGuardada.trim().toUpperCase()
        );

        if (cityObj) {
          selectedCity.value = cityObj.nombre;
          citySearch.value = cityObj.nombre;
          selectedCityId.value = cityObj.id;

          // 4. Dejamos los barrios cargados listos para que el usuario solo despliegue y seleccione
          await loadBarrios(cityObj.id);
        }
      }
    }
  }
});
</script>

<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <section class="container registro min-h-screen flex flex-col justify-between p-0">
      <div class="row align-items-center">
        <div class="col-lg-6 desktop">
          <picture>
            <img src="/public/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago" />
          </picture>
        </div>
      </div>

      <div class="select-option mt-5 p-5">
        <h3 class="mb-4 titulo-7">¿Cuéntanos dónde está tu negocio?</h3>

        <p class="font-bold">Elige un Departamento</p>
        <div class="custom-select-wrapper relative">
          <input
            type="text"
            v-model="departmentSearch"
            @input="filterDepartments(departmentSearch)"
            @focus="showDepartments = true"
            @blur="setTimeout(() => showDepartments = false, 200)"
            @click="showDepartments = !showDepartments"
            placeholder="Selecciona"
            class="custom-select w-full"
          />
          <ul
            v-show="showDepartments"
            class="absolute z-50 w-full max-h-48 overflow-auto border bg-white"
          >
            <li
              v-for="d in filteredDepartments"
              :key="d"
              @click="selectDepartment(d)"
              class="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {{ d }}
            </li>
          </ul>
        </div>

        <p class="font-bold mt-4">Elige una Ciudad</p>
        <div class="custom-select-wrapper relative">
          <input
            type="text"
            v-model="citySearch"
            @input="filterCities(citySearch)"
            @focus="showCities = true"
            @blur="setTimeout(() => showCities = false, 200)"
            @click="showCities = !showCities"
            placeholder="Selecciona"
            class="custom-select w-full"
            :disabled="!selectedDepartmentId"
          />
          <ul
            v-show="showCities"
            class="absolute z-50 w-full max-h-48 overflow-auto border bg-white"
          >
            <li
              v-for="c in filteredCities"
              :key="c"
              @click="selectCity(c)"
              class="p-2 hover:bg-gray-200 cursor-pointer"
            >{{ c }}</li>
          </ul>
        </div>

        <p class="font-bold mt-4">Elige un Barrio</p>
        <div class="custom-select-wrapper relative">
          <input
            type="text"
            v-model="buscarBarrio"
            @input="filtrarBarrios(buscarBarrio)"
            @focus="mostrarBarrios = true"
            @blur="setTimeout(() => mostrarBarrios = false, 200)"
            @click="mostrarBarrios = !mostrarBarrios"
            placeholder="Selecciona"
            class="custom-select w-full"
            :disabled="!selectedCityId"
          />
          <ul
            v-show="mostrarBarrios"
            class="absolute z-50 w-full max-h-48 overflow-auto border bg-white"
          >
            <li
              v-for="b in barriosFiltrados"
              :key="b"
              @click="selectBarrio(b)"
              class="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {{ b }}
            </li>
          </ul>
        </div>
        <div class="custom-select-wrapper relative">
          <label for="direccion" class="input-label mt-5">
            <input
              v-model="direccion"
              class="form-control"
              aria-required="true"
              name="direccion"
              type="text"
              placeholder=" "
              autocomplete="off"
              id="direccion"
            />
            <span class="floating-label font-bold">Ingresa tu dirección</span>
          </label>
        </div>
      </div>
    
      <div class="p-5">
        <Button class="mt-5" @click="handleSubmit"></Button>
      </div>
    </section>
    <p v-if="error" class="text-danger mt-1 flex justify-center">{{ error }}</p>
    <Footer />
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
}
.custom-select:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Estilos de Dirección de la Segunda Pantalla */
.input-label {
  position: relative;
  display: block;
  width: 100%;
  margin-top: 32px;
}
.form-control {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #09008be1;
  background: transparent;
  font-family: sans-serif;
  outline: none;
  transition: border-color 0.3s ease;
}
.floating-label {
  position: absolute;
  left: 0;
  top: 10px;
  color: black;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease all;
  font-family: sans-serif;
}
.form-control:focus + .floating-label,
.form-control:not(:placeholder-shown) + .floating-label {
  top: -20px;
  font-size: 13px;
  color: #dd3590; /* cambia al color rosa al enfocar/escribir */
}
.input-label:hover .form-control {
  border-bottom-color: #ff00f2;
}
.form-control:focus {
  border-bottom-color: #ff00f2;
  outline: none;
  box-shadow: none;
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
.container button {
  padding: 0 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: #fff;
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
}
.container {
  background-color: white;
  color: #111;
  padding: 20px;
}
p {
  color: black;
  font-size: 1rem;
}
@media (max-width: 767px) {
  .desktop {
    display: none;
  }
}
</style>