<script setup>
import { ref } from 'vue'; // Importa ref para crear variables reactivas
import RouterLink from "../components/UI/Routerlink.vue"; 
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import { FormKit } from "@formkit/vue";   
import Alerta from "../components/UI/Alerta.vue";

const ciudad = localStorage.getItem('selectedCity');
const direccion = ref(''); // Crea una propiedad reactiva para la dirección
const barrio = ref(''); // Crea una propiedad reactiva para el barrio
const error = ref(''); // Crea una propiedad reactiva para el mensaje de error

const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Validación
    if (!direccion.value || !barrio.value) {
        error.value = 'Por favor, ingresa tu dirección y tu barrio.';

        setTimeout(() => {
            error.value = '';
        }, 3000);
        return false;
    }

    // Limpiar error si no lo hay
    error.value = '';

    // Redirigir a la nueva página
    window.open("/Pantalla9View", "_parent");
};
</script>

<template>   
  <Heading></Heading>

  <section class="container py-5 registro">
    <div class="row align-items-center">
      <div class="col-lg-6 desktop">
        <picture>
          <img src="/public/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago">
        </picture>
      </div>
      <Alerta v-if="error">{{ error }}</Alerta>
      <div class="col-lg-6">
        <div class="mt-4 tarjeta">
          <form @submit="handleSubmit">
            <div class="form-group">
              <h3 class="titulo-8 mb-4">¿Y en qué parte de {{ ciudad }}?</h3>
              <p>Ingresa tu dirección</p>
              <label for="direccion" id="label-direccion"> 
                <input v-model="direccion" class="form-control" aria-required="true" name="direccion" type="text" placeholder="Dirección" data-gtm="home-hero-email-field" autocomplete="off" id="direccion" aria-describedby="error-direccion">
              </label>
              <p>Detalles (Opcional)</p>
              <label for="detalles" id="label-detalles"> 
                <input class="form-control" aria-required="false" name="detalles" type="text" placeholder="Detalles" data-gtm="home-hero-email-field" autocomplete="off" id="detalles" aria-describedby="error-detalles">
              </label>
              <p>Barrio</p>
              <label for="barrio" id="label-barrio"> 
                <input v-model="barrio" class="form-control" aria-required="true" name="barrio" type="text" placeholder="Barrio" data-gtm="home-hero-email-field" autocomplete="off" id="barrio" aria-describedby="error-barrio">
              </label>
            </div>
            <Button></Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}
.titulo-8 {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-top: -100px;
}
.form-group input {
  background-color: transparent;
  border-width: 0px 0px 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(17, 17, 17, 0.2);
  color: rgb(17, 17, 17);
  display: block;
  margin: 0;
  padding: 8px 0;
  outline: none;
  width: 100%;
}
.container button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: rgb(255, 255, 255);
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;    
  border: 0;
  transform: translate3d(0, 0, 0);
}
.container {
  background-color: white;
  color: #111111;
}
span {
  color: rgb(8, 168, 48);
}
.parrafo {
  font-size: medium;
}
.info-banner {
  font-family: Graphik-Medium, Graphik-Regular, "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0 0 12px;
  font-weight: 500;
  font-size: 1.875rem;
  line-height: 1.2;
}
.h5 {
  font-weight: bold;
}
p {
  color: black;
}
@media (max-width: 767px) {
  .desktop {
    display: none;
  }
  .tarjeta {
    background-color: rgb(255, 255, 255);
    padding: 24px;
    border-radius: 16px;
    width: 100%;
  }
}
</style>
