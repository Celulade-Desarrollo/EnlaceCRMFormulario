<script setup>
import { ref, onMounted, watch } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";

// Inicializar los valores de los campos
const email = ref("");
const confirmaremail = ref("");
const errorMessage = ref("");
const emailErrorMessage = ref("");
const confirmEmailErrorMessage = ref("");

// Función para limpiar valores undefined o null
const clearUndefined = (value) => {
  return value === undefined || value === null ? "" : value;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validar que los correos coincidan
const validateEmail = () => {
  const emailValue = clearUndefined(email.value);
  const confirmEmailValue = clearUndefined(confirmaremail.value);

  // Limpiar mensajes de error
  emailErrorMessage.value = "";
  confirmEmailErrorMessage.value = "";

  if (emailValue && !emailRegex.test(emailValue)) {
    emailErrorMessage.value = "Por favor, ingresa un correo electrónico válido."
  }

  if (confirmEmailValue && !emailRegex.test(confirmEmailValue)) {
    emailErrorMessage.value = "Por favor, ingresa un correo electrónico válido."
  }

  if (
    emailRegex.test(emailValue) &&
    emailRegex.test(confirmEmailValue) &&
    emailValue !== confirmEmailValue) {
    confirmEmailErrorMessage.value = "Los correos electrónicos no coinciden.";
  }
};

// Validar en tiempo real mientras se escriben los correos
watch([email, confirmaremail], validateEmail);

// Validar al enviar el formulario
const handleSubmit = (event) => {
  const emailValue = clearUndefined(email.value);
  const confirmEmailValue = clearUndefined(confirmaremail.value);

  // Limpiar mensajes de error
  emailErrorMessage.value = "";
  confirmEmailErrorMessage.value = "";

  if (!emailValue || !confirmEmailValue) {
    event.preventDefault();
    errorMessage.value = "Por favor, completa todos los campos obligatorios.";

    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  } else if (emailValue !== confirmEmailValue) {
    event.preventDefault();
    confirmEmailErrorMessage.value = "Los correos electrónicos no coinciden.";
  }
};

// Montar el event listener para el envío del formulario
onMounted(() => {
  const form = document.getElementById("myForm");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
</script>

<template>
  <Heading class="mb-[80px]" />
  <div class="relative">
    <section class="container registro">
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
          <div className="flex justify-center">
            <h2 class="display-4 titulo-2 w-[350px] text-center">
              Contar con tu fiado enlace es muy fácil !
            </h2>
          </div>
          <div class="mt-4 tarjeta">
            <form action="Pantalla3View" id="myForm">
              <div class="form-group">
                <p class="mb-4 font-bold">Registra tus datos</p>

                <label for="email" class="input-label">
                  <input
                    id="email"
                    v-model="email"
                    class="form-control"
                    aria-required="true"
                    name="email"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                  />
   
                  <span class="floating-label"
                    >Ingresa tu correo electrónico</span
                  >
  
                </label>

                <label for="confirmaremail" class="input-label mt-4 mb-0">
                  <input
                    id="confirmaremail"
                    v-model="confirmaremail"
                    class="form-control"
                    aria-required="true"
                    name="confirmaremail"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                  />

                  <span class="floating-label"
                    >Confirma tu correo electrónico</span
                  >

                </label>
                <p v-if="errorMessage" id="error-celular" class="text-danger mt-1">
                    {{ errorMessage }}
                </p>
                <span v-if="emailErrorMessage" class="text-danger text-sm mt-1 d-block">
                    {{ emailErrorMessage }}
                  </span>
                <span class="error-message">{{
                  confirmEmailErrorMessage
                }}</span>
              </div>
              <Button></Button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer class="absolute bottom-0 left-0 right-0" />
  </div>
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
#confirmaremail {
  margin-bottom: 50px;
}
#email-on-hero-submit-btn {
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
  top: 0px;
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
