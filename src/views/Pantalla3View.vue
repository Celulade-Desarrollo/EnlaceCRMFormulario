<script setup>
import { ref } from "vue";
import Heading from "../components/UI/Heading.vue";
import Alerta from "../components/UI/Alerta.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";

const clearUndefined = (value) => {
  return value === undefined || value === null ? "" : value;
};

// Inicializar los valores de los campos
const nombre = ref(clearUndefined(localStorage.getItem("nombres")));
const apellido = ref(clearUndefined(localStorage.getItem("apellido")));

// Variables para mostrar errores
const errorMessage = ref("");

// Función para manejar el envío del formulario
const handleSubmit = (event) => {
  // Resetear el mensaje de error
  errorMessage.value = "";

  // Validar si los campos están vacíos
  if (!nombre.value || !apellido.value) {
    errorMessage.value = "Por favor, completa todos los campos obligatorios.";
    event.preventDefault(); // Evitar el envío del formulario
  }

  setTimeout(() => {
    errorMessage.value = "";
  }, 3000);
};
</script>

<template>
  <Heading></Heading>

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

      <Alerta v-if="errorMessage">{{ errorMessage }}</Alerta>

      <div class="col-lg-6">
        <div class="mt-4 tarjeta">
          <form action="Pantalla13View" @submit="handleSubmit">
            <div class="form-group mt-[40px]">
              <p class="titulo-3 mb-4">
                Ingresa tu nombre completo tal como aparece en la cédula
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
                  required
                />
                <span class="floating-label">Ingresa tus nombres</span>
              </label>

              <label for="primerApellido" class="input-label mt-4">
                <input
                  id="primerApellido"
                  class="form-control"
                  v-model="apellido"
                  name="primerApellido"
                  type="text"
                  autocomplete="off"
                  placeholder=" "
                  required
                />
                <span class="floating-label">Ingresa tu primer apellido</span>
              </label>

              <label for="segundoApellido" class="input-label mt-4">
                <input
                  id="segundoApellido"
                  class="form-control"
                  name="segundoApellido"
                  type="text"
                  autocomplete="off"
                  placeholder=" "
                />
                <span class="floating-label"
                  >Ingresa tu segundo apellido (Opcional)</span
                >
              </label>
            </div>
            <Button></Button>
          </form>
        </div>
      </div>
    </div>
  </section>
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
