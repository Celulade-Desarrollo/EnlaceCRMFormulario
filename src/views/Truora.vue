<script setup>
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { ref, onMounted } from "vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";

const store = useFormularioStore();
const router = useRouter();

const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");

</script>

<template>
  <Heading></Heading>
  <motion.div v-bind="fadeInUp">
    <section
      class="container registro h-[100vh] flex flex-col justify-between overflow-hidden p-0"
    >
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
        <div class="col-lg-6 botones p-5">
          <div>
            <h2 class="titulo">Validaremos tu identidad</h2>
            <p class="mb-4 font-bold">
              <picture>
                <img
                  src="/public/pago.png"
                  alt="Pago"
                  class="img-fluid"
                  loading="lazy"
                  title="Pago"
                />
              </picture>
            </p>
          </div>

          <div class="mt-4 tarjeta">
            <div class="validar-truora flex flex-col items-center">
              <!-- Nuevo título encima del botón -->
              <h3 class="mb-3 font-bold text-center">
                Necesitarás tu Cédula de Ciudadanía</h3>
              <a
                href="https://identity.truora.com/preview/IPFf58ef097af96942b9769cea7565b4034" 
                style=" text-decoration: none; background: #DD3590; color: #ffffff; border-radius: 6px; display: inline-block; padding: 8px 32px; font-weight: bold; " > 
                Iniciar validación 
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
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
.titulo {
  font-size: 2rem;
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
.validar-truora {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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