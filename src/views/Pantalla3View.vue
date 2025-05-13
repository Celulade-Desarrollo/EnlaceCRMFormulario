<script setup>
import { ref, watch, onMounted } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

const clearUndefined = (value) => {
  return value === undefined || value === null ? "" : value;
};

// Inicializar los valores de los campos
const nombre = ref("");
const apellido = ref("");
const SegundoApellido = ref("");
const router = useRouter();
const store = useFormularioStore();

// Variables para mostrar errores
const errorMessage = ref("");
const nombreError = ref("");
const apellidoError = ref("");
const SegundoApellidoError = ref("");

const validateNombre = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(nombre.value)) {
    nombre.value = nombre.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  if (!nombre.value || !nameRegex.test(nombre.value)) {
    nombreError.value =
      "Por favor, ingresa un nombre válido, sin tildes y solo letras.";
  } else {
    nombreError.value = ""; // Limpiar el mensaje de error si es válido
  }
};

const validateApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(apellido.value)) {
    apellido.value = apellido.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  }
  if (!apellido.value || !nameRegex.test(apellido.value)) {
    apellidoError.value =
      "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
  } else {
    apellidoError.value = ""; // Limpiar el mensaje de error si es válido
  }
};

const validateSegundoApellido = () => {
  if (/[^a-zA-ZÀ-ÿ\s'-]/.test(SegundoApellido.value)) {
    SegundoApellido.value = SegundoApellido.value.replace(
      /[^a-zA-ZÀ-ÿ\s'-]/g,
      ""
    );
  }
  if (SegundoApellido.value && !nameRegex.test(SegundoApellido.value)) {
    SegundoApellidoError.value =
      "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
  } else {
    SegundoApellidoError.value = ""; // Limpiar el mensaje de error si es válido
  }
};

watch([nombre, apellido, SegundoApellido], () => {
  validateNombre();
  validateApellido();
  validateSegundoApellido();
});

// Función para manejar el envío del formulario
const handleSubmit = (event) => {
  // Resetear el mensaje de error
  errorMessage.value = "";
  nombreError.value = "";
  apellidoError.value = "";
  SegundoApellidoError.value = "";

  let isValid = true;

  if (!nombre.value || !nameRegex.test(nombre.value)) {
    nombreError.value =
      "Por favor, ingresa un nombre válido, sin tildes y solo letras.";
    isValid = false;
    setTimeout(() => {
      nombreError.value = "";
    }, 3000);
  }

  if (!apellido.value || !nameRegex.test(apellido.value)) {
    apellidoError.value =
      "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
    isValid = false;
    setTimeout(() => {
      apellidoError.value = "";
    }, 3000);
  }

  if (SegundoApellido.value && !nameRegex.test(SegundoApellido.value)) {
    SegundoApellidoError.value =
      "Por favor, ingresa un apellido válido, sin tildes y solo letras.";
    isValid = false;
    setTimeout(() => {
      SegundoApellidoError.value = "";
    }, 3000);
  }

  // Validar si los campos están vacíos
  if (!isValid) {
    event.preventDefault(); // Evitar el envío del formulario
    errorMessage.value = "Por favor, completa todos los campos correctamente.";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
    return;
  }
  event.preventDefault();
  store.completarFormulario(); // Marca el formulario como completado
  router.push("/cedula"); // Redirige a la siguiente pantalla
};

onMounted(() => {
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
                  Ingresa tu nombre completo tal como aparece en la cédula
                </p>
                <p v-if="errorMessage" class="text-danger mt-1">
                  {{ errorMessage }}
                </p>

                <label for="nombres" class="input-label">
                  <input
                    id="nombres"
                    class="form-control"
                    v-model="nombre"
                    name="nombres"
                    type="text"
                    autocomplete="off"
                    placeholder=" "
                    @input="validateNombre"
                  />
                  <span class="floating-label">Ingresa tus nombres</span>
                </label>
                <p v-if="nombreError" class="text-danger mt-1">
                  {{ nombreError }}
                </p>
                <label for="primerApellido" class="input-label mt-4">
                  <input
                    id="primerApellido"
                    class="form-control"
                    v-model="apellido"
                    name="primerApellido"
                    type="text"
                    autocomplete="off"
                    placeholder=" "
                    @input="validateApellido"
                  />
                  <span class="floating-label">Ingresa tu primer apellido</span>
                </label>
                <p v-if="apellidoError" class="text-danger mt-1">
                  {{ apellidoError }}
                </p>
                <label for="segundoApellido" class="input-label mt-4">
                  <input
                    id="segundoApellido"
                    class="form-control"
                    name="segundoApellido"
                    type="text"
                    autocomplete="off"
                    placeholder=" "
                    v-model="SegundoApellido"
                    @input="validateSegundoApellido"
                  />
                  <span class="floating-label"
                    >Ingresa tu segundo apellido (Opcional)</span
                  >
                </label>
                <p v-if="SegundoApellidoError" class="text-danger mt-1">
                  {{ SegundoApellidoError }}
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
