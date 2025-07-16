<script setup>
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Footer from "../components/UI/Footer.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from '../stores/formStore.js'

const store = useFormularioStore();
const router = useRouter();
const error = ref("");
const formStore = useFormStore()

const handleSubmit = (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto
  const numeroneveras = document.querySelector('input[name="nevera"]:checked');
  const registro = document.querySelector('input[name="registro"]:checked');

  const neveraSeleccionada = document.querySelector(
    'input[name="nevera"]:checked'
  );
  const registroSeleccionado = document.querySelector(
    'input[name="registro"]:checked'
  );

  if (!neveraSeleccionada || !registroSeleccionado) {
    error.value = "Por favor responde todas las preguntas antes de continuar.";
    return; // Detener si falta una respuesta
  }
  // Limpiar error si no lo hay
  error.value = "";
  event.preventDefault(); // Evita el envío del formulario por defecto
  store.completarFormulario(); // Marca el formulario como completado
  router.push("/ventas"); // Redirige a la siguiente pantalla
  formStore.updateField('Numero_de_neveras', numeroneveras.value)
  formStore.updateField('Registrado_Camara_Comercio', registro.value)
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
              src="/public/pago.png"
              alt="Pago"
              class="img-fluid"
              loading="lazy"
              title="Pago"
            />
          </picture>
        </div>
        <div class="col-lg-6 botones">
          <div>
            <h2 class="mb-2 titulo">Cuentanos un poco acerca de tu negocio</h2>
            <p class="mb-4 font-bold">
              Esta información es totalmente confidencial y esta nos permitirá
              conocerte mejor
            </p>
          </div>
          <div class="button-container">
            <p class="font-bold">¿Tu tienda tiene neveras?</p>

            <input
              type="radio"
              id="nevera-no"
              class="checkbox-hidden"
              name="nevera"
              value="No"
            />
            <label for="nevera-no" class="button mt-4">No</label>

            <input
              type="radio"
              id="nevera-1"
              class="checkbox-hidden"
              name="nevera"
              value="1"
            />
            <label for="nevera-1" class="button mt-4">1</label>

            <input
              type="radio"
              id="nevera-2"
              class="checkbox-hidden"
              name="nevera"
              value="2"
            />
            <label for="nevera-2" class="button mt-4">2</label>

            <input
              type="radio"
              id="nevera-3"
              class="checkbox-hidden"
              name="nevera"
              value="3 o más"
            />
            <label for="nevera-3" class="button mt-4">3 o más</label>
          </div>

          <div class="button-container">
            <p class="font-bold">
              ¿Estás registrado ante la cámara de comercio de tu ciudad?
            </p>

            <input
              type="radio"
              id="registro-si"
              class="checkbox-hidden"
              name="registro"
              value="Sí"
            />
            <label for="registro-si" class="button mt-4">Sí</label>

            <input
              type="radio"
              id="registro-no"
              class="checkbox-hidden"
              name="registro"
              value="No"
            />
            <label for="registro-no" class="button mt-4">No</label>
          </div>

          <div class="mt-4 tarjeta">
            <div class="checklist">
              <Button @click="handleSubmit"></Button>
              <p v-if="error" class="text-danger mt-1 flex justify-center">
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
  <Footer class="bottom-0 left-0 right-0"></Footer>
</template>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
}

.checkbox-hidden {
  display: none;
}

.button {
  padding: 10px 20px;
  margin-right: 0.5rem;
  border-radius: 8px;
  border: 0px solid #ccc;
  cursor: pointer;
  background: #dd3590;
  color: #ffffff;
  transition: 0.3s;
  width: 80%;
  border-radius: 50px;
}

.checkbox-hidden:checked + label.button {
  background-color: #251786; /* azul */
  color: white;
}

.button:hover {
  background-color: #f15bab;
}
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}
.formkit-wrapper {
  align-items: center;
  width: 100%;
}
.formkit-input {
  text-align: center;
}
.formkit-help {
  margin-left: 50px;
}
.form-group input {
  background-color: transparent;
  border-width: 0px 0px 1px;
  border-top-style: initial;
  border-right-style: initial;
  border-left-style: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  border-image: initial;
  border-radius: 0px;
  box-sizing: border-box;
  color: rgb(17, 17, 17);
  caret-color: currentcolor;
  display: block;
  margin: 0px;
  padding: 8px 0px;
  text-align: left;
  outline: none;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: rgba(17, 17, 17, 0.2);
  --inputCurrentColor: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tarjeta button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  --rippleLayerColor: rgba(255, 255, 255, 0.2);
  height: 3rem;
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  outline: 0px;
  -webkit-box-align: center;
  align-items: center;
  vertical-align: bottom;
  text-align: center;
  overflow: hidden;
  position: relative;
  border: 0px;
  transform: translate3d(0px, 0px, 0px);
}
.titulo {
  font-size: 2rem;
}
.container button,
.tarjeta button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  --rippleLayerColor: rgba(255, 255, 255, 0.2);
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: center; /* Cambiado a center para alinear el texto centrado */
  cursor: pointer;
  outline: 0px;
  align-items: center; /* Para centrar verticalmente el contenido */
  text-align: center; /* Asegura que el texto esté centrado */
  overflow: hidden;
  position: relative;
  border: 0px;
  transform: translate3d(0px, 0px, 0px);
}
.container button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  --rippleLayerColor: rgba(255, 255, 255, 0.2);
  height: 3rem;
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  outline: 0px;
  -webkit-box-align: center;
  align-items: center;
  vertical-align: bottom;
  text-align: center;
  overflow: hidden;
  position: relative;
  border: 0px;
  transform: translate3d(0px, 0px, 0px);
}
.container {
  background-color: white;
  color: #111111;
  padding: 20px;
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
  margin: 0px 0px 12px;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}
.h5 {
  font-weight: bold;
}
p {
  color: black;
}
/* Estilo para los elementos de la lista */
.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
}

/* Estilo para el input de tipo checkbox (ocultarlo) */
.check-item input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

/* Estilo para el contenedor de la marca de verificación */
.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 10px;
  position: relative;
}

/* Estilo para la marca de verificación cuando está seleccionada */
/* .check-item input[type="checkbox"]:checked + .checkmark {
  background-color: #dd3590;
  border: 2px solid #dd3590;
} */

/* Estilo para el símbolo de verificación dentro del círculo */
/* .checkmark::after {
        content: "";
        position: absolute;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        display: none;
    } */

/* Mostrar el símbolo de verificación cuando está seleccionado */
.check-item input[type="checkbox"]:checked + .checkmark::after {
  display: block;
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
