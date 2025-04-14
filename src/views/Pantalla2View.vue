<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import RouterLink from "../components/UI/Routerlink.vue";
import Heading from "../components/UI/Heading.vue";
import Alerta from '../components/UI/Alerta.vue';

// Inicializar los valores de los campos
const cedula = ref('');
const email = ref('');
const confirmaremail = ref('');
const errorMessage = ref('');
const emailErrorMessage = ref('');
const confirmEmailErrorMessage = ref('');

// Función para limpiar valores undefined o null
const clearUndefined = (value) => {
  return value === undefined || value === null ? '' : value;
};

// Validar que los correos coincidan
const validateEmail = () => {
  const emailValue = clearUndefined(email.value);
  const confirmEmailValue = clearUndefined(confirmaremail.value);

  // Limpiar mensajes de error
  emailErrorMessage.value = '';
  confirmEmailErrorMessage.value = '';

  if (emailValue !== confirmEmailValue) {
    confirmEmailErrorMessage.value = 'Los correos electrónicos no coinciden.';
  }
};

// Validar en tiempo real mientras se escriben los correos
watch([email, confirmaremail], validateEmail);

// Validar al enviar el formulario
const handleSubmit = (event) => {
  const emailValue = clearUndefined(email.value);
  const confirmEmailValue = clearUndefined(confirmaremail.value);

  // Limpiar mensajes de error
  emailErrorMessage.value = '';
  confirmEmailErrorMessage.value = '';
  
  if (!emailValue || !confirmEmailValue) {
    event.preventDefault();
    errorMessage.value = 'Por favor, completa todos los campos obligatorios.';

    setTimeout(() => {
      errorMessage.value=''
    }, 3000);
  } else if (emailValue !== confirmEmailValue) {
    event.preventDefault();
    confirmEmailErrorMessage.value = 'Los correos electrónicos no coinciden.';
  }
};

// Montar el event listener para el envío del formulario
onMounted(() => {
  const form = document.getElementById('myForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});
</script>

<template>
  <Heading />

  <section class="container py-5 registro">
    <div class="row align-items-center">
      <div class="col-lg-6 desktop">
        <picture>
          <img src="/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago" />
        </picture>
      </div>

      <Alerta class="titulo" v-if="errorMessage">{{ errorMessage }}</Alerta>
      
      <div class="col-lg-6">
        <div>
          <h2 class="display-4 titulo-2">Contar con tu fiado enlace es muy fácil!!!</h2>
        </div>
        <div class="mt-4 tarjeta">
          <form action="Pantalla3View" id="myForm">
            <div class="form-group">
              <p class="mb-4">Registra tus datos</p>
              <p>Ingresa tu correo electrónico</p>
              <label for="email">
                <input id="email" v-model="email" class="form-control" aria-required="true" name="email" type="email" placeholder="" autocomplete="off" />
              </label>
              <span class="error-message">{{ emailErrorMessage }}</span> <!-- Mensaje de error para el email -->
              <p class="mt-4">Confirma tu correo electrónico</p>
              <label for="confirmaremail">
                <input id="confirmaremail" v-model="confirmaremail" class="form-control" aria-required="true" name="confirmaremail" type="email" placeholder="" autocomplete="off" />
              </label>
              <span class="error-message">{{ confirmEmailErrorMessage }}</span> <!-- Mensaje de error para confirmación de email -->
            </div>
            <button type="submit" id="email-on-hero-submit-btn" class="btn btn-primary">
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
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}

/* Estilo para campos con error */
.error {
  border-color: red !important;
  border-width: 2px;
}

/* Mensajes de error personalizados */
.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
  display: block; /* Muestra el mensaje de error */
}
.titulo-2 {
    margin: 0 0 16px;
    color: inherit;
    font-weight: bold;
    letter-spacing: -0.03em;
    font-size: 1.875rem;
    line-height: 1.2;
    margin-top: -40px;
}
.container {
  background-color: white;
  color: #111111;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.tarjeta {
  background-color: rgb(255, 255, 255);
  padding: 24px;
  border-radius: 16px;
}

.container button {
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
  transform: translate3d(0, 0, 0);
}
#confirmaremail{
  margin-bottom: 50px;
}
#email-on-hero-submit-btn{
  margin-bottom: 100px;
}
@media (max-width: 767px) {
  .desktop {
    display: none;
  }

  .titulo {
    font-weight: bold;
  }

  .tarjeta {
    width: 100%;
  }
}
</style>
