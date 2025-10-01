<script setup>
import { ref } from "vue";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import { onMounted } from "vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";

const option1Checked = ref(false);
const option2Checked = ref(false);

function handleFormSubmit(event) {
  event.preventDefault();

  // Redirigir a las páginas correspondientes
  if (option1Checked.value) {
    window.open("/Pantalla7View", "_parent");
  } else if (option2Checked.value) {
    window.open("/Pantalla6View", "_parent");
  } else {
    alert("Por favor, selecciona al menos una opción.");
  }
}

const handleCheckboxChange = (event) => {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });
};

onMounted(() => {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
});
</script>

<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <section class="container py-5 registro">
      <div class="mt-4 tarjeta">
        <div class="">
          <h1 class="titulo mb-4">¿Cual es tu nacionalidad?</h1>
          <form @submit="handleFormSubmit">
            <div class="checklist">
              <label class="check-item">
                <input
                  type="checkbox"
                  v-model="option1Checked"
                  class="single-checkbox"
                />
                <span class="checkmark font-bold"></span>
                Colombia </label
              ><br />
              <label class="check-item">
                <input
                  type="checkbox"
                  v-model="option2Checked"
                  class="single-checkbox"
                />
                <span class="checkmark font-bold"></span>
                Otros </label
              ><br />
              <Button></Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </motion.div>
</template>

<style scoped>
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
  font-size: 0.75rem;
}
.checklist {
  max-width: 300px;
  margin-top: 30px;
  margin: 0 auto;
}
.titulo {
  font-weight: bold;
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
.check-item input[type="checkbox"]:checked + .checkmark {
  background-color: #dd3590;
  border: 2px solid #dd3590;
}

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
.input-as-button {
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

.input-as-button:hover {
  background-color: #dd3590; /* Color de fondo cuando se pasa el ratón por encima */
}

.input-as-button:focus {
  outline: none; /* Eliminar el borde de enfoque predeterminado */
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
