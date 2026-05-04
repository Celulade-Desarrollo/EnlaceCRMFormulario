<script setup>
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import Footer from "../components/UI/Footer.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
</script>
<template>
  <div>
    <HeadingNoAtras />
    <motion.div v-bind="fadeInUp">
      <section class="asesor-wrap">

        <div class="asesor-icon-ring">
          <!-- icono persona -->
        </div>

        <h1 class="asesor-titulo">Tu proceso está en <span>buenas manos</span></h1>
        <p class="asesor-desc">
          Un asesor revisará tu solicitud y te contactará pronto para ayudarte 
          a completar tu registro con Enlace y Banco W.
        </p>

        <div class="asesor-pasos">
          <div class="paso"><span class="paso-num">1</span><div class="paso-texto"><strong>Revisión de tu solicitud</strong><span>Nuestro equipo verificará tu información en las próximas horas hábiles.</span></div></div>
          <div class="paso"><span class="paso-num">2</span><div class="paso-texto"><strong>Contacto personalizado</strong><span>Un asesor se comunicará contigo por WhatsApp o llamada para guiarte.</span></div></div>
          <div class="paso"><span class="paso-num">3</span><div class="paso-texto"><strong>Activación de tu cupo</strong><span>Una vez completado el proceso, tu cupo Enlace quedará activo.</span></div></div>
        </div>

        <div class="asesor-badge">✓ Solicitud recibida exitosamente</div>

      </section>
    </motion.div>
    <Footer />
  </div>
</template>
<style scoped>
.asesor-wrap {
  max-width: 520px;
  margin: 40px auto;
  text-align: center;
  padding: 0 20px;
}

.asesor-icon-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #dd3590;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Aquí pones tu icono dentro */
}

.asesor-titulo {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.asesor-titulo span {
  color: #dd3590;
}

.asesor-desc {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.5;
}

.asesor-pasos {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.paso {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.paso-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #00b5e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
}

.paso-texto strong {
  display: block;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 4px;
}
.paso-texto span {
  color: #555;
}

.asesor-badge {
  margin-top: 40px;
  padding: 12px 24px;
  border-radius: 50px;
  background: #e8f5e9;
  color: #4caf50;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>