<script setup>
import { ref, onMounted } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from "../stores/formStore.js";
import axios from "axios";

const formStore = useFormStore();
const store = useFormularioStore();
const router = useRouter();

const direccion = ref("");
const detalles = ref("");
const selectedBarrio = ref("");
const barrios = ref([]);
const error = ref("");
const buscarBarrio = ref("");
const barriosFiltrados = ref([]);
const mostrarBarrios = ref(false);

onMounted(async () => {
  const miRuta = window.location.pathname;
  localStorage.setItem("ruta", miRuta);

  const cityId = localStorage.getItem("selectedCityId");

  if (cityId) {
    try {
      const response = await axios.get(`/api/ubicacion/barrios/${cityId}`);
      const sorted = response.data.sort((a, b) => 
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );
      barrios.value = sorted;
      barriosFiltrados.value = sorted.map(b => b.nombre);

    } catch (err) {
      console.error("Error al cargar los barrios:", err);
      error.value = "Error al cargar los barrios.";
    }
  }
});

  const filtrarBarrios = (input) => {
    barriosFiltrados.value = barrios.value
      .map(barrio => barrio.nombre)
      .filter(nombre =>
        nombre.toLowerCase().includes(input.toLowerCase())
      );
  };

  const selectBarrio = (nombre) => {
    selectedBarrio.value = nombre;
    buscarBarrio.value = nombre;
    mostrarBarrios.value = false;
  }
const handleSubmit = (event) => {
  event.preventDefault();

  // Validar campos obligatorios
  if (!direccion.value || !selectedBarrio.value) {
    error.value = "Por favor, ingresa tu dirección y tu barrio.";
    setTimeout(() => (error.value = ""), 3000);
    return;
  }

  error.value = "";

  formStore.updateField("Direccion", direccion.value);
  formStore.updateField("Detalles", detalles.value);
  formStore.updateField("Barrio", selectedBarrio.value);


  console.log({
    Direccion: direccion.value,
    Detalles: detalles.value,
    Barrio: selectedBarrio.value,
  });

  store.completarFormulario();

  router.push("/informacionNegocio");
};

// Ciudad seleccionada
const ciudad = localStorage.getItem("selectedCity");
</script>

<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <section
      class="container registro p-0 flex flex-col h-[100vh] justify-between overflow-hidden"
    >
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

        <div class="col-lg-6">
          <div class="mt-4 tarjeta">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <h3 class="titulo-8 mb-4 mt-1">
                  ¿Y en qué parte de {{ ciudad }}?
                </h3>

                <!-- Dirección -->
                <label for="direccion" class="input-label mt-4">
                  <input
                    v-model="direccion"
                    class="form-control"
                    aria-required="true"
                    name="direccion"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                    id="direccion"
                    aria-describedby="error-direccion"
                  />
                  <span class="floating-label">Ingresa tu dirección</span>
                </label>

                <!-- Detalles -->
                <label for="detalles" class="input-label mt-4">
                  <input
                    v-model="detalles"
                    class="form-control"
                    aria-required="false"
                    name="detalles"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                    id="detalles"
                    aria-describedby="error-detalles"
                  />
                  <span class="floating-label"
                    >Detalles de tu dirección</span
                  >
                </label>

                <!-- Barrio -->
                <p class="font-bold mt-4">Elige un Barrio</p>

<div class="custom-select-wrapper relative">
  <input
    type="text"
    v-model="buscarBarrio"
    @input="filtrarBarrios(buscarBarrio)"
    @focus="mostrarBarrios = true"
    placeholder="Elige un Barrio"
    class="custom-select w-full"
  />

  <ul
    v-show="mostrarBarrios"
    class="absolute z-50 w-full max-h-48 overflow-auto border bg-white"
  >
    <li
      v-for="b in barriosFiltrados"
      :key="b"
      @click="seleccionarBarrio(b)"
      class="p-2 hover:bg-gray-200 cursor-pointer"
    >
      {{ b }}
    </li>
  </ul>
</div>
              </div>

              <!-- Botón principal -->
              <Button type="submit" />

              <!-- Mensaje de error -->
              <p v-if="error" class="text-danger mt-1 flex justify-center">
                {{ error }}
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  </motion.div>
</template>


<style scoped>
.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}

.input-label {
  position: relative;
  display: block;
  width: 100%;
  margin-top: 24px;
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

/* Animación al enfocar o escribir */
.form-control:focus + .floating-label,
.form-control:not(:placeholder-shown) + .floating-label {
  top: -15px;
  font-size: 12px;
  color: black;
}

.input-label:hover .form-control {
  border-bottom-color: #ff00f2;
}

.form-control:focus {
  border-bottom-color: #0064e6cc;
  outline: none;
  box-shadow: none;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}
.titulo-8 {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-top: -100px;
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
  border: 0;
  text-align: center;
  transform: translate3d(0, 0, 0);
}

.container {
  background-color: white;
  color: #111111;
}
span {
  color: rgb(8, 168, 48);
}
.parrafo {
  font-size: medium;
}
.info-banner {
  font-family: Graphik-Medium, Graphik-Regular, "Gotham SSm A", "Gotham SSm B",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0 0 12px;
  font-weight: 500;
  font-size: 1.875rem;
  line-height: 1.2;
}
.h5 {
  font-weight: bold;
}
p {
  color: black;
}
@media (max-width: 767px) {
  .desktop {
    display: none;
  }
  .tarjeta {
    background-color: rgb(255, 255, 255);
    padding: 24px;
    border-radius: 16px;
    width: 100%;
  }
}
</style>
