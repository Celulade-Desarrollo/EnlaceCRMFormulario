<script setup>
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import Button from "../components/UI/Button.vue"; // Componente original
import { ref } from "vue";
import axios from "axios";

const numeroSinPrefijo = ref("");
const error = ref(""); 

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
}

async function handleWhatsapp() {
  // Validación Colombia: 10 dígitos iniciando con 3
  const regex = /^3[0-9]{9}$/;
  
  if (!numeroSinPrefijo.value) {
    error.value = "Por favor, ingresa un número de celular.";
    setTimeout(() => error.value = "", 3000);
    return;
  }

  if (!regex.test(numeroSinPrefijo.value)) {
    error.value = "Ingresa un número válido (ej: 3168233221).";
    setTimeout(() => error.value = "", 3000);
    return;
  }

  error.value = "";
  
  try {
    await axios.post(`/whatsapp/meta/truora-link/${numeroSinPrefijo.value}/${"cliente"}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    window.location.reload();
  } catch (err) {
    console.error("❌ Error:", err);
    error.value = "Error al enviar el mensaje.";
  }
}
</script>

<template>
  <HeadingNoAtras />

  <motion.div v-bind="fadeInUp">
    <section class="container validacion-container">
      
      <div class="content-block">
        <p class="instruccion-text">
          Para completar tu solicitud, es necesario <strong>validar tu identidad</strong>. Por favor, continúa en el siguiente botón:
        </p>
        <Button @click="truoraNavegador"></Button>
      </div>

      <div class="divider">
        <span>o también</span>
      </div>
      <Button @click="truoraNavegador" ></Button>

      <div class="content-block">
        <p class="secundario-text">
          Para enviar el enlace de validación por WhatsApp, ingrese el número y presione enviar.
        </p>

        <label for="numeroSinPrefijo" class="input-label">
          <input
            id="numeroSinPrefijo"
            class="form-control"
            v-model="numeroSinPrefijo"
            type="number"
            placeholder=" "
            autocomplete="off"
          />
          <span class="floating-label">Ingresa el número</span>
        </label>

        <p v-if="error" class="text-danger mt-1">{{ error }}</p>

        <button @click="handleWhatsapp" class="submit-btn-manual mt-4">
          Enviar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20" class="icon-svg">
            <path d="M18.5 10H2.5M18.5 10L12 16.5M18.5 10L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="imagen-footer">
        <img src="/public/validacionUsuario.jpg" alt="Validación" class="img-fluid" />
      </div>

    </section>
  </motion.div>
</template>

<style scoped>
/* Layout */
.validacion-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.content-block { width: 100%; max-width: 400px; }

.instruccion-text { font-size: 1.1rem; line-height: 1.4; margin-bottom: 20px; }
.secundario-text { font-size: 0.95rem; color: #555; }

.divider {
  width: 100%;
  max-width: 280px;
  border-bottom: 1px solid #eee;
  line-height: 0.1em;
  margin: 30px 0;
  color: #999;
}
.divider span { background:#fff; padding:0 10px; }

.input-label { position: relative; display: block; width: 100%; margin-top: 24px; }

.form-control {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #09008be1;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
}
.form-control:focus {
  border-bottom-color: #0064e6cc;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}
.floating-label {
  position: absolute;
  left: 0;
  top: 10px;
  color: black;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease all;
}
.form-control:focus + .floating-label,
.form-control:not(:placeholder-shown) + .floating-label {
  top: -15px;
  font-size: 12px;
}
.input-label:hover .form-control { border-bottom-color: #ff00f2; }
.form-control:focus { border-bottom-color: #0064e6cc; }

.submit-btn-manual {
  outline: none;
  padding: 0 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: white;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: background 0.3s;
  width: 100%;
}
.submit-btn-manual:hover { background: #c42f7e; }
.icon-svg { margin-left: 0.25rem; }

.text-danger { color: #dc3545; font-size: 0.85rem; margin-top: 8px; display: block; text-align: center;}
.mt-4 { margin-top: 1.5rem; }

.imagen-footer {
  width: 100%;
  max-width: 180px;
  margin-top: 40px;
  opacity: 0.8;
}

@media (max-height: 650px) {
  .imagen-footer { display: none; }
}
</style>