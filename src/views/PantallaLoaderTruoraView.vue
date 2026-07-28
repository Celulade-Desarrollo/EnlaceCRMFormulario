<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { motion } from "motion-v";
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import axios from "axios";

const POLL_INTERVAL_MS = 5000; // cada 5 segundos
const truoraData = ref({});
const status = ref("loading"); // loading | pending | success | failure
const numeroSinPrefijo = ref("");
const errorWhatsapp = ref("");

let intervalId = null;
let idProcess = null;

const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get("token");

const consultarEstado = async () => {
  if (!idProcess) return;

  try {
    const response = await axios.get(`/api/truora/${idProcess}`);

    truoraData.value = response.data;

    console.log(truoraData.value);

    if (truoraData.value.Confirmacion_Identidad === "success") {
      status.value = "success";
      detenerPolling();
    } else if (
      truoraData.value.Confirmacion_Identidad === "failure" ||
      truoraData.value.Confirmacion_Identidad === "declined"
    ) {
      status.value = "failure";
      detenerPolling();
    } else if (truoraData.value.Confirmacion_Identidad === "pending") {
      status.value = "pending";
    }
  } catch (error) {
    console.error(error);
  }
};

const detenerPolling = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  idProcess = queryParams.get("process_id");

  // primera consulta inmediata
  consultarEstado();

  // sigue preguntando cada POLL_INTERVAL_MS mientras siga montado
  intervalId = setInterval(consultarEstado, POLL_INTERVAL_MS);
});

onUnmounted(() => {
  detenerPolling();
});

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
  const regex = /^3[0-9]{9}$/;

  if (!numeroSinPrefijo.value) {
    errorWhatsapp.value = "Por favor, ingresa un número de celular.";
    setTimeout(() => errorWhatsapp.value = "", 3000);
    return;
  }

  if (!regex.test(numeroSinPrefijo.value)) {
    errorWhatsapp.value = "Ingresa un número válido (ej: 3168233221).";
    setTimeout(() => errorWhatsapp.value = "", 3000);
    return;
  }

  errorWhatsapp.value = "";

  try {
    await axios.post(`/whatsapp/meta/truora-link/${numeroSinPrefijo.value}/cliente`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    window.location.reload();
  } catch (err) {
    console.error("❌ Error:", err);
    errorWhatsapp.value = "Error al enviar el mensaje.";
  }
}
</script>
<template>
  <div class="pantalla-truora">
    <HeadingNoAtras />

    <motion.div v-bind="fadeInUp">
      <section class="container validacion-container">

        <!-- LOADING / PENDING -->
        <template v-if="status === 'loading' || status === 'pending'">
          <div class="loader-container">
            <img src="/enlaceFiado.png" alt="" class="logo-img" />
            <div class="spinner"></div>
          </div>

          <div v-if="status === 'pending'" class="content-block">
            <p class="instruccion-text">
              <span style="color: dodgerblue;">
                <strong>
                  Tu validación de identidad se encuentra en revisión.
                  Este proceso puede tardar algunos minutos.<br />
                  Por favor, espera mientras verificamos el estado de tu validación.
                </strong>
              </span>
            </p>
          </div>
        </template>

        <!-- FAILURE -->
        <template v-else-if="status === 'failure'">
          <div class="content-block">
            <p class="instruccion-text">
              <span style="color: red;">
                <strong>
                  Tu validación de identidad falló debido a</strong>
                <strong>{{ truoraData.declined_reason_message }}</strong>
              </span>
              Por favor, valida nuevamente, continúa en el siguiente botón:
            </p>
            <button class="submit-btn-manual" @click="truoraNavegador">
              Reintentar validación
            </button>
          </div>

          <div class="divider">
            <span>o también</span>
          </div>

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

            <p v-if="errorWhatsapp" class="text-danger mt-1">{{ errorWhatsapp }}</p>

            <button @click="handleWhatsapp" class="submit-btn-manual mt-4">
              Enviar
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20" class="icon-svg">
                <path d="M18.5 10H2.5M18.5 10L12 16.5M18.5 10L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </template>

        <!-- SUCCESS -->
        <template v-else-if="status === 'success'">
          <div class="content-block">
            <h2 class="titulo text-center">
              ¡Tu solicitud ha finalizado <span>exitosamente!</span><br />
              Gracias por compartir tu información con nosotros
            </h2>
            <img src="/celebracion.png" alt="Celebración" class="celebracion-img" />
            <h2 class="titulo text-center">
              <span>En el transcurso de dos días hábiles nos comunicaremos contigo.</span>
            </h2>
          </div>
        </template>
<!-- 
        <div class="imagen-footer">
          <img src="/validacionUsuario.jpg" alt="Validación" class="img-fluid" />
        </div> -->

      </section>
    </motion.div>
  </div>
</template>
<style scoped>
.pantalla-truora {
  min-height: 100vh;
  background-color: #ffffff;
}

.validacion-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: #111;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

.spinner {
  margin-top: 20px;
  width: 40px;
  height: 40px;
  border: 5px solid #5708eb;
  border-top: 5px solid #ff00f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.content-block {
  width: 100%;
  max-width: 400px;
}

.instruccion-text {
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 20px;
}

.secundario-text {
  font-size: 0.95rem;
  color: #555;
}

.divider {
  width: 100%;
  max-width: 280px;
  border-bottom: 1px solid #eee;
  line-height: 0.1em;
  margin: 30px 0;
  color: #999;
}

.divider span {
  background: #fff;
  padding: 0 10px;
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
  color: #111;
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

.input-label:hover .form-control {
  border-bottom-color: #ff00f2;
}

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

.submit-btn-manual:hover {
  background: #c42f7e;
}

.icon-svg {
  margin-left: 0.25rem;
}

.text-danger {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 8px;
  display: block;
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}

.titulo {
  font-weight: 500;
  font-size: 1.875rem;
  line-height: 1.2;
  margin: 0 0 16px;
  color: inherit;
}

.titulo span {
  color: #dd3590;
}

.celebracion-img {
  max-width: 250px;
  width: 100%;
  margin: 20px 0;
}

.logo-img {
  height: 60px;
  width: 250px;
}

.imagen-footer {
  width: 100%;
  max-width: 180px;
  margin-top: 40px;
  opacity: 0.8;
}

@media (max-height: 650px) {
  .imagen-footer {
    display: none;
  }
}
</style>