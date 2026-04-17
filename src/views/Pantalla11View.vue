<script setup>
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { onMounted,ref } from 'vue';
import axios from 'axios';

const handleInicio = () => {
  window.open("/", "_self");
};

const status = ref('loading'); 
const processId = ref(null);

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);

  let paramStatus = urlParams.get('status');
  if (!paramStatus || paramStatus.includes('{{')) {
    paramStatus = 'success'; 
  }

  const allIds = urlParams.getAll('process_id');
  const realId = allIds.find(id => id && !id.includes('{{'));

  processId.value = realId;
  status.value = (paramStatus === 'success') ? 'success' : 'failure';

  // 3. Si encontramos un ID real, disparamos la sincronización
  if (processId.value) {
    try {
      console.log("Sincronizando ID real:", processId.value);
      const response = await axios.get(`/api/truora/${processId.value}`);
      
      // REFUERZO: Si el backend dice que en verdad falló, cambiamos la pantalla
      if (response.data.Confirmacion_Identidad === 'failure' || response.data.Confirmacion_Identidad=== 'declined') {
        status.value = 'failure';
      }
      
      console.log('Datos en BD:', response.data);
    } catch (error) {
      console.error('Error al sincronizar:', error);
    }
  }
});
const handleReintentar = () => {
  window.open("https://identity.truora.com/preview/IPFf58ef097af96942b9769cea7565b4034", "_self");
};
</script>

<template>
  <HeadingNoAtras />
  <motion.div v-bind="fadeInUp">
    <section class="container py-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          
          <div v-if="status === 'success' || status === 'loading'">
            <h2 class="display-4 titulo text-center">
              ¡Tu solicitud ha finalizado <span>exitosamente!</span><br />
              Gracias por compartir tu información con nosotros
            </h2>
            <picture>
              <img src="/public/celebracion.png" class="img-fluid mt-auto" />
            </picture>
            <h2 class="display-4 titulo text-center">
              <span>En el transcurso de dos días hábiles nos comunicaremos contigo.</span>
            </h2>
          </div>

          <div v-else class="text-center">
            <h2 class="display-4 titulo">
              Algo no salió <span>bien</span>
            </h2>
            <p class="parrafo">
              No pudimos validar tu identidad. Asegúrate de estar en un lugar iluminado y que tu documento sea legible.
            </p>
            <button @click="handleReintentar">
              Intentar nuevamente
              <svg width="24" height="24" viewBox="0 0 24 24">...</svg>
            </button>
          </div>

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
  border-radius: 13px;
  background: #dd3590;
  color: rgb(255, 255, 255);
  --rippleLayerColor: rgba(255, 255, 255, 0.2);
  height: 3rem;
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  outline: 0px;
  -webkit-box-align: center;
  align-items: center;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  border: 0px;
  transform: translate3d(0px, 0px, 0px);
}
span {
  color: #dd3590;
}
.parrafo {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: medium;
}
.info-banner {
  margin: 0px 0px 12px;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  background-color: #dd3590;
  color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
}
.titulo-1 {
  font-weight: bold;
}
.titulo {
  margin: 0px 0px 16px;
  color: inherit;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}
.registro {
  background-color: #251886;
  color: white;
}
.banners {
  background-color: white;
}

.tarjeta button {
  justify-content: center;
}

@media (max-width: 767px) {
  .img-fluid {
    margin-top: -90px;
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
