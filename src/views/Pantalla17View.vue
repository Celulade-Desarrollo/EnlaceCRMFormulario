<script setup>
import RouterLink from "../components/UI/Routerlink.vue";
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
</script>

<template>
  <HeadingNoAtras />

  <motion.div v-bind="fadeInUp">
    <section class="container validacion-container">
      <div class="texto">
        <p class="texto-negrita">
          Estamos a un paso de finalizar tu solicitud. Te hemos enviado a tu WhatsApp un mensaje para la validación de tu identidad.
        </p>
      </div>

      <div class="imagen">
        <img
          src="/public/validacionUsuario.jpg"
          alt="Validación de identidad"
          class="img-fluid"
        />
      </div>
    </section>
  </motion.div>
</template>

<style scoped>
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}

.validacion-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.texto {
  max-width: 760px;
  font-size: 1.6rem;
  line-height: 1.4;
  color: #111;
  margin-bottom: 40px;
  text-align: center;
}

.texto-negrita {
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.5;
  color: #111;
}

.imagen img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

@media (max-width: 767px) {
  .imagen img {
    margin-top: 10px;
  }
}
</style>
