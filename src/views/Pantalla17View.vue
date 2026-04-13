<script setup>
import RouterLink from "../components/UI/Routerlink.vue";
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import Button from "../components/UI/Button.vue";
import { ref } from "vue";
import axios from "axios";

const numeroSinPrefijo = ref("");

const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get("token");

function truoraNavegador() {
  const truoraUrl = "https://identity.truora.com/preview/IPFf58ef097af96942b9769cea7565b4034";
  const isAndroid = /android/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href = `intent://${truoraUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
  } else {
    const ventana = window.open(truoraUrl, '_blank');
    if (!ventana || ventana.closed || typeof ventana.closed === 'undefined') {
      window.location.href = truoraUrl;
    }
  }
};

async function handleWhatsapp(numeroSinPrefijo) {
  
  try {
    await axios.post(`/whatsapp/meta/truora-link/${numeroSinPrefijo}/${"cliente"}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error("❌ Error enviando mensaje:", err);
    return;
  }
  window.location.reload();
};
</script>

<template>
  <HeadingNoAtras />

  <motion.div v-bind="fadeInUp">
    <section class="container validacion-container">
      <div class="texto">
        <p class="texto-negrita">
          Para completar tu solicitud, es necesario validar tu identidad. Por favor, continúa en el siguiente botón:
        </p>
      </div>
      <Button @click="truoraNavegador"></Button><br>

      <div class="texto">
        <p class="texto-negrita">
         Para enviar el enlace de validación de identidad por WhatsApp, ingrese el número y presione enviar.
        </p>
          <label for="numeroSinPrefijo" class="input-label">
            <input
              id="numeroSinPrefijo"
              class="form-control"
              v-model="numeroSinPrefijo"
              type="text"
              placeholder=" "
            />
            <span class="floating-label">Ingresa el número</span>
          </label>
        <!-- <input type="text" v-model="numeroSinPrefijo" placeholder="Número de WhatsApp"> -->
      </div>
      <Button @click="handleWhatsapp(numeroSinPrefijo)">Enviar</Button>

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
