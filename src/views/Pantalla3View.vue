<script setup>
import { ref } from "vue";
import RouterLink from "../components/UI/Routerlink.vue"; 
import Heading from "../components/UI/Heading.vue";
import { FormKit } from "@formkit/vue";
import Alerta from "../components/UI/Alerta.vue";

const clearUndefined = (value) => {
  return value === undefined || value === null ? '' : value;
};

// Inicializar los valores de los campos
const nombre = ref(clearUndefined(localStorage.getItem('nombres')));
const apellido = ref(clearUndefined(localStorage.getItem('apellido')));

// Variables para mostrar errores
const errorMessage = ref('');

// Función para manejar el envío del formulario
const handleSubmit = (event) => {
  // Resetear el mensaje de error
  errorMessage.value = '';

  // Validar si los campos están vacíos
  if (!nombre.value || !apellido.value) {
    errorMessage.value = 'Por favor, completa todos los campos obligatorios.';
    event.preventDefault(); // Evitar el envío del formulario
  }

  setTimeout(() => {
    errorMessage.value=''
  }, 3000);
};
</script>

<template>
  <Heading></Heading>

  <section class="container py-5 registro">
    <div class="row align-items-center">
      <div class="col-lg-6 desktop">
        <picture>
          <img src="/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago">
        </picture>
      </div>

      <Alerta v-if="errorMessage">{{ errorMessage }}</Alerta>

      <div class="col-lg-6">
        <div class="mt-4 tarjeta">
          <form action="Pantalla4View" @submit="handleSubmit">
            <div class="form-group">
              <p class="titulo-3 mb-4">Ingresa tu nombre completo tal como aparece en la cédula</p>

              <p class="mb-4">Ingresa tus nombres</p>
              <label for="nombres">
                <input id="nombres" class="form-control" v-model="nombre" name="nombres" type="text" autocomplete="off">
              </label>

              <p class="mb-4 mt-4">Ingresa tu primer apellido</p>
              <label for="primerApellido">
                <input id="primerApellido" class="form-control" v-model="apellido" name="primerApellido" type="text" autocomplete="off">
              </label>

              <p class="mb-4 mt-4">Ingresa tu segundo apellido (Opcional)</p>
              <label for="segundoApellido">
                <input id="segundoApellido" class="form-control" name="segundoApellido" type="text" autocomplete="off">
              </label>
            </div>
            <button type="submit" id="submit-btn" class="btn btn-primary">
              Continuar
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20" class="ml-2" color="currentColor" role="img">
                <title>Arrow Right</title>
                <g>
                  <path d="M18.5 10H2.5M18.5 10L12 16.5M18.5 10L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"></path>
                </g>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
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

.btn {
  padding: 0 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: none;
  text-align: center;
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
</style>
