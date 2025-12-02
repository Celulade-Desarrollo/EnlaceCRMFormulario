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


const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

const nombre = ref("");
const apellido = ref("");
const SegundoApellido = ref("");
const cedula = ref("");

// Datos almacenados en localStorage
const nbCliente = localStorage.getItem("nbCliente");
const nbAgenteComercial = localStorage.getItem("nbAgenteComercial");

// Errores
const errorMessage = ref("");
const nombreError = ref("");
const apellidoError = ref("");
const SegundoApellidoError = ref("");
const cedulaErrorMessage = ref("");

// ---------------- VALIDACIONES ----------------
const validateNombre = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(nombre.value)) {
    nombre.value = nombre.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  if (!nombre.value || !nameRegex.test(nombre.value)) {
    nombreError.value = "Por favor, ingresa un nombre válido, sin tildes y solo letras.";
  } else {
    nombreError.value = "";
  }
};

const validateApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(apellido.value)) {
    apellido.value = apellido.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  if (!apellido.value || !nameRegex.test(apellido.value)) {
    apellidoError.value = "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
  } else {
    apellidoError.value = "";
  }
};

const validateSegundoApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(SegundoApellido.value)) {
    SegundoApellido.value = SegundoApellido.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  if (SegundoApellido.value && !nameRegex.test(SegundoApellido.value)) {
    SegundoApellidoError.value = "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
  } else {
    SegundoApellidoError.value = "";
  }
};

const validateCedula = () => {
  if (!/^\d{6,10}$/.test(cedula.value)) {
    cedulaErrorMessage.value = "La cédula debe tener entre 6 y 10 dígitos.";
    return false;
  }
  cedulaErrorMessage.value = "";
  return true;
};

// Auto-validación al escribir
watch([nombre, apellido, SegundoApellido], () => {
  validateNombre();
  validateApellido();
  validateSegundoApellido();
});

// ---------------- SUBMIT ----------------
const handleSubmit = async (event) => {
  event.preventDefault();

  errorMessage.value = "";
  cedulaErrorMessage.value = "";

  let isValid = true;

  if (!nombre.value || !nameRegex.test(nombre.value)) {
    nombreError.value = "Por favor, ingresa un nombre válido, sin tildes y solo letras.";
    isValid = false;
  }

  if (!apellido.value || !nameRegex.test(apellido.value)) {
    apellidoError.value = "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
    isValid = false;
  }

  if (SegundoApellido.value && !nameRegex.test(SegundoApellido.value)) {
    SegundoApellidoError.value = "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
    isValid = false;
  }

  if (!validateCedula()) {
    isValid = false;
  }

  if (!isValid) {
    errorMessage.value = "Por favor, completa todos los campos correctamente.";
    return;
  }

  try {
    const response = await axios.post("/api/flujoRegistroEnlace/cedula", {
      nbAgenteComercial: nbAgenteComercial,
      nbCliente: nbCliente,
    });

    console.log("Respuesta de la API:", response.data);

    // Validación de cédula
    const cedulaApi = String(response.data);
    const cedulaInput = String(cedula.value).trim();
    const cedulaApiValue = String(cedulaApi).trim();

    if (cedulaInput !== cedulaApiValue) {
      const ultimos4 = cedulaApiValue.slice(-4);
      const cedulaPista = cedulaApiValue.slice(0, -4).replace(/./g, "*") + ultimos4;
      cedulaErrorMessage.value = `Debes ingresar la misma cédula registrada en COMPI terminada en ${cedulaPista}`;
      return;
    }

    // Guardar en el store
    store.completarFormulario();
    formStore.updateField("Nombres", nombre.value);
    formStore.updateField("Primer_Apellido", apellido.value);
    formStore.updateField("2do_Apellido_opcional", SegundoApellido.value);
    formStore.updateField("Cedula_Cliente", cedula.value.toString());

    router.push("/datosPersonales");
  } catch (err) {
    console.error("❌ Error validando cédula:", err);
    cedulaErrorMessage.value = "Error al validar la cédula, inténtalo de nuevo.";
  }
};

onMounted(() => {
  let miRuta = window.location.pathname;

  if (localStorage.getItem.length > 0) {
    localStorage.removeItem("ruta");
    localStorage.setItem("ruta", miRuta);
  } else {
    localStorage.setItem("ruta", miRuta);
  }
});
</script>

<template>
  <Heading></Heading>
  <motion.div v-bind="fadeInUp">
    <section class="container py-5 registro">
      <div class="row align-items-center">
        <div class="col-lg-6 desktop">
          <picture>
            <img
              src="/pago.png"
              alt="Pago"
              class="img-fluid"
              loading="lazy"
              title="Pago"
            />
          </picture>
        </div>

        <div class="col-lg-6">
          <div class="mt-4 tarjeta">
            <form>
              <div class="form-group mt-[40px]">
                <p class="titulo-3 mb-4">
                  Ingresa tu nombre completo tal como aparece en tu cédula
                </p>
                <p v-if="errorMessage" class="text-danger mt-1">
                  {{ errorMessage }}
                </p>

                <label for="nombres" class="input-label">
                  <input
                    id="nombres"
                    class="form-control"
                    v-model="nombre"
                    type="text"
                    placeholder=" "
                    @input="validateNombre"
                  />
                  <span class="floating-label">Ingresa tus nombres</span>
                </label>
                <p v-if="nombreError" class="text-danger mt-1">{{ nombreError }}</p>

                <label for="primerApellido" class="input-label mt-4">
                  <input
                    id="primerApellido"
                    class="form-control"
                    v-model="apellido"
                    type="text"
                    placeholder=" "
                    @input="validateApellido"
                  />
                  <span class="floating-label">Ingresa tu primer apellido</span>
                </label>
                <p v-if="apellidoError" class="text-danger mt-1">{{ apellidoError }}</p>

                <label for="segundoApellido" class="input-label mt-4">
                  <input
                    id="segundoApellido"
                    class="form-control"
                    v-model="SegundoApellido"
                    type="text"
                    placeholder=" "
                    @input="validateSegundoApellido"
                  />
                  <span class="floating-label">Ingresa tu segundo apellido (opcional)</span>
                </label>
                <p v-if="SegundoApellidoError" class="text-danger mt-1">
                  {{ SegundoApellidoError }}
                </p>
                <label for="cedula" class="input-label mt-4">
                  <input
                    id="cedula"
                    class="form-control"
                    v-model="cedula"
                    type="text"
                    placeholder=" "
                    @input="validateCedula"
                  />
                  <span class="floating-label">Ingresa tu cédula</span>
                </label>
                <p v-if="cedulaErrorMessage" class="text-danger mt-1">
                  {{ cedulaErrorMessage }}
                </p>
              </div>
              <Button @click="handleSubmit"></Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
  <Footer />
</template>

<style scoped>
/* Mensajes de error personalizados */
.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
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

#submit-btn {
  margin-bottom: 50px;
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
</style>
