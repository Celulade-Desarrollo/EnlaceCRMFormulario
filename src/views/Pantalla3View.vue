<script setup>
import { ref, watch, onMounted } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from "../stores/formStore.js";
import axios from "axios";

const formStore = useFormStore();
const store = useFormularioStore();
const router = useRouter();

const isLoading = ref(false);
const cedulaDesdeApi = ref("");
const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

const nombre = ref("");
const apellido = ref("");
const SegundoApellido = ref("");
const cedula = ref("");

const nbCliente = localStorage.getItem("nbCliente");
const nbAgenteComercial = localStorage.getItem("nbAgenteComercial");

const errorMessage = ref("");
const nombreError = ref("");
const apellidoError = ref("");
const SegundoApellidoError = ref("");
const cedulaErrorMessage = ref("");

// onMounted(async () => {
//   localStorage.setItem("ruta", window.location.pathname);

//   try {
//     const response = await axios.post("/api/flujoRegistroEnlace/cedula", {
//       nbAgenteComercial,
//       nbCliente,
//     });
//     cedulaDesdeApi.value = String(response.data).trim();
//   } catch (err) {
//     console.error("Error al cargar cédula inicial:", err);
//   }
// });

const validateNombre = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(nombre.value)) {
    nombre.value = nombre.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  nombreError.value = (!nombre.value || !nameRegex.test(nombre.value)) ? "Nombre no válido." : "";
};

const validateApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(apellido.value)) {
    apellido.value = apellido.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  apellidoError.value = (!apellido.value || !nameRegex.test(apellido.value)) ? "Apellido no válido." : "";
};

const validateSegundoApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(SegundoApellido.value)) {
    SegundoApellido.value = SegundoApellido.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
};

const handleCedulaInput = () => {
  if (!cedula.value) {
    cedulaErrorMessage.value = "";
  }
};

const checkCedulaFormat = () => {
  const valid = /^\d{6,10}$/.test(cedula.value);
  if (!valid) {
    cedulaErrorMessage.value = "La cédula debe tener entre 6 y 10 dígitos.";
  }
  return valid;
};

watch([nombre, apellido], () => {
  validateNombre();
  validateApellido();
});

const handleSubmit = async (event) => {
  if (event) event.preventDefault();
  if (isLoading.value) return;

  errorMessage.value = "";
  cedulaErrorMessage.value = "";

  // if (!nombre.value || !apellido.value || !checkCedulaFormat()) {
  //   errorMessage.value = "Por favor, completa todos los campos correctamente.";
  //   return;
  // }
    if (!checkCedulaFormat()) {
    errorMessage.value = "Por favor, completa todos los campos correctamente.";
    return;
  }

  isLoading.value = true;

  try {

    if (!cedulaDesdeApi.value) {

      const response = await axios.post("/api/flujoRegistroEnlace/cedula", {
        nbAgenteComercial,
        nbCliente,
      });
      console.log("cedularesponse",response.data)

      cedulaDesdeApi.value = String(response.data.documento).trim();
    }

    const cedulaInput = String(cedula.value).trim();

    if (cedulaInput !== cedulaDesdeApi.value) {

      const ultimos4 = cedulaDesdeApi.value.slice(-4);

      const cedulaPista =
        cedulaDesdeApi.value.slice(0, -4).replace(/./g, "*") +
        ultimos4;

      cedulaErrorMessage.value =
        `Debes ingresar la misma cédula registrada en COMPI terminada en ${cedulaPista}. Si no reconoces esta cédula o tienes problemas con el registro, comunícate con soporte aquí: `;

      return;
    }

    store.completarFormulario();

    formStore.updateField("Nombres", nombre.value);
    formStore.updateField("Primer_Apellido", apellido.value);
    formStore.updateField("2do_Apellido_opcional", SegundoApellido.value);
    formStore.updateField("Cedula_Cliente", cedula.value.toString());

    router.push("/negocio");

  } catch (err) {

    if (
      err.response?.status === 404 &&
      err.response?.data?.message === "No encontrado"
    ) {

      cedulaErrorMessage.value = "Cédula no encontrada en COMPI. Por favor, contacta soporte.";

    } else {
      cedulaErrorMessage.value ="Error de red al validar.";
    }

  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Heading></Heading>
  <motion.div v-bind="fadeInUp">
    <section class="container py-5 registro">
      <div class="row align-items-center">
        <div class="col-lg-6 desktop">
          <picture>
            <img src="/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago" />
          </picture>
        </div>

        <div class="col-lg-6">
          <div class="mt-4 tarjeta">
            <form @submit.prevent="handleSubmit">
              <div class="form-group mt-[40px]">
                <p class="titulo-3 mb-4">
                  Ingresa tu cédula debe ser la misma registrada en app compi
                </p>
                <p v-if="errorMessage" class="text-danger mt-1">
                  {{ errorMessage }}
                </p>

                <!-- <label for="nombres" class="input-label">
                  <input id="nombres" class="form-control" v-model="nombre" type="text" placeholder=" " @input="validateNombre" />
                  <span class="floating-label">Ingresa tus nombres</span>
                </label>
                <p v-if="nombreError" class="text-danger mt-1">{{ nombreError }}</p>

                <label for="primerApellido" class="input-label mt-4">
                  <input id="primerApellido" class="form-control" v-model="apellido" type="text" placeholder=" " @input="validateApellido" />
                  <span class="floating-label">Ingresa tu primer apellido</span>
                </label>
                <p v-if="apellidoError" class="text-danger mt-1">{{ apellidoError }}</p>

                <label for="segundoApellido" class="input-label mt-4">
                  <input id="segundoApellido" class="form-control" v-model="SegundoApellido" type="text" placeholder=" " @input="validateSegundoApellido" />
                  <span class="floating-label">Ingresa tu segundo apellido (opcional)</span>
                </label> -->

                <label for="cedula" class="input-label mt-4">
                  <input id="cedula" class="form-control" v-model="cedula" type="text" placeholder=" " @input="handleCedulaInput" />
                  <span class="floating-label">Ingresa tu cédula</span>
                </label>
                
                <div v-if="cedulaErrorMessage" class="mt-3">
                  <p class="text-danger-larga">
                    {{ cedulaErrorMessage }}
                  </p>
                  <div class="text-center mt-2">
                    <a href="https://wa.me/573196622476" target="_blank" class="btn-link">
                      Contactar Servicio al Cliente
                    </a>
                  </div>
                </div>
              </div>
              <div v-if="isLoading" class="loader-container">
                <div class="loader"></div>
              </div>
              <Button v-else type="submit"></Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
  <Footer />
</template>

<style scoped>

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}

.loader {
  border: 5px solid #5708eb;
  border-top: 5px solid #ff00f2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.text-danger-larga {
  color: red;
  font-weight: bold;
  font-size: 0.95rem;
  line-height: 1.4;
  text-align: left;
  margin-top: 10px;
}

.btn-link {
  display: inline-block;
  margin-top: 10px;
  background-color: #DD3590;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}

.btn-link:hover {
  opacity: 0.9;
  color: white;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
  margin: 0;
}

.container {
  background-color: white;
  color: #111111;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

.titulo-3 {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-top: -100px;
}

.desktop {
  display: block;
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

.text-danger {
  color: red;
}
</style>