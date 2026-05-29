<template>
<div class="pantalla-failed">
  <motion.div v-bind="fadeInUp">
    <div class="loader-container">
      <img src="/enlaceFiado.png" alt="" class="h-[60px] w-[250px]" />
      <div class="spinner"></div>
    </div>
  </motion.div>
</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { motion } from "motion-v";
import axios from 'axios';

const router = useRouter();
 onMounted(async () => {
   const queryParams = new URLSearchParams(window.location.search);
   const idProcess = queryParams.get('process_id');
    

 try {
   const response = await axios.get(`api/truora/${idProcess}`);
   const data = response.data;
   console.log("estatuestado de validacion:", data.Confirmacion_Identidad)
   console.log("Data completa:", data);

    if (data.Confirmacion_Identidad === "success") {

      router.push("/Terminado");

    } else if (data.Confirmacion_Identidad === "failure" || data.Confirmacion_Identidad === "pending") {
        router.push("/PantallafailedTruora");
    } 
 } catch (error) { 
    console.error("Error inesperado:", error);
    }
 });

</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  to {
    transform: rotate(360deg);
  }
}
.pantalla-failed {
  min-height: 100vh;
  background-color: #251886;
}
</style>