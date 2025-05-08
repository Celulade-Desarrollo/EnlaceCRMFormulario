<script setup>
import { onMounted, ref } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const cedula = ref(localStorage.getItem("cedula") || "");

// Referencias para los checkboxes
const checkboxes = ref([]);
const error = ref("");

// Función para manejar el cambio de checkboxes
const handleCheckboxChange = (event) => {
  checkboxes.value.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });
};

// Validar que al menos una opción de cada grupo esté seleccionada
const validateCheckboxes = () => {
  const group1Checked = Array.from(
    document.querySelectorAll(".single-checkbox")
  ).some((checkbox) => checkbox.checked);
  return group1Checked;
};

// Validar los campos del formulario
const validateForm = () => {
  let valid = true;

  // Validar campo de cédula
  const cedulaField = document.getElementById("numeroCedula");
  const cedulaError = document.getElementById("cedula-error");
  if (!cedulaField.value) {
    cedulaField.classList.add("error"); // Añadir clase de error
    cedulaError.textContent = "La cédula es un campo obligatorio.";
    cedulaError.style.display = "block";
    valid = false;
  }else if (cedulaField.value.length !== 10){
    cedulaField.classList.add("error"); // Añadir clase de error
    cedulaError.textContent = "La cédula debe tener 10 números.";
    cedulaError.style.display = "block";
    valid = false;
  }
  else {
    cedulaField.classList.remove("error"); // Quitar clase de error
    cedulaError.style.display = "none";
  }

  // Validar checkboxes
  if (!validateCheckboxes(error)) {
    error.value =
      "Debes autorizar el tratamiento de tus datos personales para continuar.";
    valid = false;
    setTimeout(() => {
      error.value = "";
    }, 3000);
  }

  return valid;
};

const handleSubmit = (event) => {
  if (!validateForm()) {
    event.preventDefault(); // Evitar el envío del formulario si no es válido
  }
};

onMounted(() => {
  // Asignar las referencias a los checkboxes
  checkboxes.value = Array.from(document.querySelectorAll(".single-checkbox"));

  // Agregar el event listener a los checkboxes
  checkboxes.value.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  // Vincular el handleSubmit al formulario
  document.querySelector("form").addEventListener("submit", handleSubmit);
});
</script>

<template>
  <Heading />
  <section class="container  registro">
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
          <form action="Pantalla7View" novalidate>
            <div class="form-group">
              <h4 class="mb-4 titulo-4 mt-1">Ingresa tu cédula</h4>
              <label for="numeroCedula" id="label-numeroCedula">
                <input
                  id="numeroCedula"
                  class="form-control"
                  v-model="cedula"
                  aria-required="true"
                  aria-invalid="true"
                  aria-labelledby="label-numeroCedula"
                  name="numeroCedula"
                  type="number"
                  placeholder="Ej: 1018276538"
                  autocomplete="off"
                  required
                />
              </label>
              <span id="cedula-error" class="error-message"></span>
              <!-- Mensaje de error -->
            </div>

            <div class="checklist">
              <label class="check-item">
                <input
                  type="checkbox"
                  name="autorizacion"
                  value="tratamientoDatos"
                  class="checkbox-custom rounded-checkbox single-checkbox"
                />
                <span class="checkmark"></span>
                <p class="">
                  He leído y autorizo el tratamiento de mis datos personales por
                  <a class="link-contacto" href="#">Enlace S.A.S y Banco W</a>
                </p>
              </label>
              <label class="check-item mb-4">
                <input
                  type="checkbox"
                  name="autorizacion"
                  id="wpp"
                  value="contactoWhatsapp"
                  class="checkbox-custom rounded-checkbox"
                />
                <span class="checkmark"></span>
                <p class="p-checkmark-2">
                  Autorizo a <span>Enlace S.A.S y Banco W</span> contactarme vía <span>Whatsapp</span> sobre mis productos
                  (opcional)
                </p>
              </label>
            </div>

            <Button class="mt-5"></Button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer class="absolute bottom-0 left-0 right-0"></Footer>
</template>

<style scoped>

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

/* Ocultar flechas para Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.link-contacto {
  color: #dd3590;
  text-decoration: none;
  font-weight: bold;
  text-decoration: underline;
}

.link-contacto:active {
  color: #09008be1;
  text-decoration: none;
  font-weight: bold;
}


.form-control:focus {
  outline: none;
  box-shadow: none;
  border-bottom-color: #ff00f2;
}

.error {
  border-color: red !important;
  border-width: 2px;
}

.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 5px;
  display: none;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}

.form-group input {
  background-color: transparent;
  border-width: 0 0 1px;
  border-bottom-style: solid;
  border-bottom: 2px solid #09008be1;
  color: rgb(17, 17, 17);
  padding: 8px 0;
  width: 100%;
  outline: none;
  margin-top: 24px;
}

.container button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  border: none;
  align-items: center;
  text-align: center;
  transform: translate3d(0, 0, 0);
}

.container {
  background-color: white;
  color: #111111;
}
.titulo-4 {
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.checklist {
  max-width: 300px;
  margin-top: 30px;
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
  gap: 20px;
}

.check-item input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}



.checkbox-custom + .checkmark {
  width: 50px;
  height: 20px;
  border-radius: 40px;
  background-color: #c9c7c7;
}

.checkbox-custom:checked + .checkmark {
  background-color: #dd3590;
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
    padding: 24px;
    border-radius: 16px;
  }
}
</style>
