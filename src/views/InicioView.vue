<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Heading from "../components/UI/Heading.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormularioStore } from "../router/store";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from '../stores/formStore.js'

// Variables reactivas
const celular = ref("");
const data = ref(null);
const error = ref("");
const celularInput = ref(null);
const router = useRouter();
const store = useFormularioStore();

// formulario global
const formStore = useFormStore();

// checkboxes de autorización
const autorizoDatos = ref(false);
const autorizoContacto = ref(false);

// Función para obtener datos
const fetchData = async () => {
  try {
    const response = await axios.get(
      `https://enlacecrm.com/api/get_data.php?celular=${celular.value}`
    );
    data.value = response.data;
    console.log(data.value);
    localStorage.setItem("nombre", data.value.NOMBRE_Y_APELLIDO);
    localStorage.setItem("cedula", data.value.CEDULA);
    localStorage.setItem("ciudadNacimiento", data.value.CIUDAD_NACIMIENTO);
    localStorage.setItem("email", data.value.CORREO_ELECTRONICO);
    window.open("/Pantalla2View", "_parent");
    error.value = "";
  } catch (error) {
    error.value = "Error al obtener los datos";
    data.value = null;
  }
};

// Validar al enviar el formulario
const handleSubmit = async (event) => {
  event.preventDefault();

  // validación celular
  const regex = /^[0-9]{10}$/;
  if (!regex.test(celular.value)) {
    error.value = "Por favor, ingresa un número celular válido.";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

  // validación checkbox obligatorio
  if (!autorizoDatos.value || !autorizoContacto.value) {
    error.value = "Debes autorizar el tratamiento de datos personales y la via de contacto.";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

  try {
    store.completarFormulario();
    formStore.updateField('Numero_Celular', celular.value.toString())
    formStore.updateField('Autorizacion_Habeas_Data', autorizoDatos.value);
    formStore.updateField('Autorizacion_Medios_de_Contacto', autorizoContacto.value);
    // si pasa validación, sigue al siguiente paso
    router.push("/correoElectronico");
    error.value = "";
  } catch (error) {
    console.error(error);
  }
};

// Función para enfocar el input
const focusInput = () => {
  if (celularInput.value) {
    celularInput.value.focus();
  }
};

// Montar el event listener para el envío del formulario
onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const nbCliente = queryParams.get('nbCliente');
  const nbAgenteComercial = queryParams.get('nbAgenteComercial');

  if (nbCliente && nbAgenteComercial) {
    localStorage.setItem('nbCliente', nbCliente);
    localStorage.setItem('nbAgenteComercial', nbAgenteComercial);
  }
  
  let miRuta = window.location.pathname;
  if (localStorage.getItem.length > 0) {
    localStorage.removeItem("ruta");
    localStorage.setItem("ruta", miRuta);
  } else {
    localStorage.setItem("ruta", miRuta);
  }
});
</script>

<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <section class="container registro">
      <div class="row align-items-center banner-registro">
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
        <div class="col-lg-6">
          <div>
            <h2 class="display-4 titulo">
              <span>Tu enlace</span> con el que podrás comprar tus productos 
              <span>favoritos</span> a cuotas y surtir tu <span>tienda</span>
            </h2>
          </div>
          <div>
            <h3 class="h5">
             Empieza ahora:
            </h3>
          </div>
          <div class="mt-4 tarjeta">
            <form id="myForm" class="w-full">
              <div class="form-group">
                <label for="celular" id="label-celular" class="input-label">
                  <input
                    class="form-control"
                    aria-required="true"
                    aria-invalid="false"
                    aria-labelledby="label-celular"
                    name="celular"
                    v-model="celular"
                    type="number"
                    placeholder=""
                    autocomplete="off"
                    id="celular"
                    aria-describedby="error-celular"
                    ref="celularInput"
                  />
                  <span class="floating-label">Ingresa tu número celular </span>
                </label>

                <!-- 🔹 Checkboxes de autorización -->
<!-- dentro del <template> -->
<div class="checklist mt-3 text-black">
  <!-- Checkbox obligatorio -->
  <label class="check-item">
    <input
      type="checkbox"
      id="autorizo-datos"
      v-model="autorizoDatos"
      class="checkbox-custom rounded-checkbox single-checkbox"
    />
    <span class="checkmark"></span>
    <p>
      He leído y autorizo el tratamiento de mis datos personales por
      <a class="link-contacto" href="#">Enlace S.A.S y Banco W</a>
    </p>
  </label>

  <!-- Checkbox opcional -->
  <label class="check-item mb-4">
    <input
      type="checkbox"
      id="autorizo-contacto"
      v-model="autorizoContacto"
      class="checkbox-custom rounded-checkbox"
    />
    <span class="checkmark"></span>
    <p class="p-checkmark-2">
      Autorizo a <span>Enlace S.A.S y Banco W</span> contactarme vía
      <span>Whatsapp</span> sobre mis productos (opcional)
    </p>
  </label>
</div>


                <!-- Mostrar errores -->
                <p v-if="error" id="error-celular" class="text-danger mt-1">
                  {{ error }}
                </p>

                <button
                  type="submit"
                  id="email-on-hero-submit-btn"
                  data-testid="email-on-hero-submit-btn"
                  data-gtm="home-hero-email-cta-btn"
                  class="btn btn-primary mt-2 w-full font-semibold"
                  @click="handleSubmit"
                >
                  Solicítalo ya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 21 20"
                    class="ml-2"
                    color="currentColor"
                    role="img"
                  >
                    <title>Arrow Right</title>
                    <g>
                      <path
                        d="M18.5 10H2.5M18.5 10L12 16.5M18.5 10L12 3.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- banners y resto igual -->
    <section class="container banners">
      <div class="row">
        <!-- Banner 1 -->
        <div class="col-md-4 mb-4">
          <div class="info-banner">
            <h2 class="titulo-1">
              Abastece tu tienda con tus proveedores favoritos
            </h2>
            <p class="parrafo">
              Enlace permite que tus proveedores favoritos te fíen tus productos
              favoritos.
            </p>
            <div class="button-banner">
              <button
                type="button"
                class="btn btn-primary mt-2"
                @click="focusInput"
              >
                Registrar mi fiado
              </button>
            </div>
          </div>
        </div>

        <!-- Banner 2 -->
        <div class="col-md-4 mb-4 banner2">
          <div class="info-banner2">
            <h2 class="titulo-1">Cuotas a 15 días</h2>
            <p class="parrafo">Paga tu fiado con la venta de tus productos.</p>
            <div class="button-banner2">
              <button
                type="button"
                class="btn btn-primary mt-2"
                @click="focusInput"
              >
                Registrar mi fiado
              </button>
            </div>
          </div>
        </div>

        <!-- Banner 3 -->
        <div class="col-md-4 mb-4">
          <div class="info-banner3">
            <h2 class="titulo-1">Todo digital y sin complicaciones</h2>
            <p class="parrafo">
              Accede de inmediato a tu cupo, 100% digital, sin complicaciones y
              sin costos ocultos.
            </p>
            <div class="button-banner3">
              <button
                type="button"
                class="btn btn-primary mt-2"
                @click="focusInput"
              >
                Registrar mi fiado
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="texto-botton p-[10px]" id="texto-botton">
        <h1>
          <span>Tu fiado</span> es otorgado <span>por Enlace y el Banco W</span>
        </h1>
        <h2 class="text-[25px]">
          y apoya a tu tienda para incrementar tus ventas y fortalecer tu
          negocio
        </h2>
      </div>
    </section>
  </motion.div>

  <Footer />
</template>

<style scoped>
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}
.row {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}


.checklist {
  max-width: 300px;
  margin-top: 30px;
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
  gap: 20px;
}

.check-item input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

.checkbox-custom + .checkmark {
  width: 50px;
  height: 20px;
  border-radius: 40px;
  background-color: #c9c7c7;
}

.checkbox-custom:checked + .checkmark {
  background-color: #dd3590;
}

.link-contacto {
  color: #dd3590;
  text-decoration: underline;
  font-weight: bold;
}

.link-contacto:active {
  color: #09008be1;
  text-decoration: none;
}



.container.banners {
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-family: sans-serif;
  outline: none;
  transition: border-color 0.3s ease;
}

.floating-label {
  position: absolute;
  left: 0;
  top: 0px;
  color: black;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease all;
  font-family: sans-serif;
}

/* Animación al enfocar o escribir */
.form-control:focus + .floating-label,
.form-control:not(:placeholder-shown) + .floating-label {
  top: -15px;
  font-size: 12px;
  color: black;
}

.input-label:hover .form-control {
  border-bottom-color: #ff00f2;
}

.form-control:focus {
  border-bottom-color: #0064e6cc;
  outline: none;
  box-shadow: none;
}
.titulo-1 {
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
}

.info-banner,
.info-banner2,
.info-banner3 {
  background: #dd3590;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.parrafo {
  font-size: 1rem;
  color: #fff;
  margin: 10px 0;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 1rem;
  background-color: #251886;
  border: none;
}

svg {
  transition: transform 0.3s ease;
}

button:hover svg {
  transform: translateX(5px);
}

/* Asegurar que sean del mismo tamaño */
.button-banner,
.button-banner2,
.button-banner3 {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button-banner .btn-primary,
.button-banner2 .btn-primary,
.button-banner3 .btn-primary {
  width: 80%;
  justify-content: center;
}

span {
  color: #dd3590;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.parrafo {
  margin-top: 20px;
  margin-bottom: 60px;
  font-size: medium;
}
.banner-registro {
  margin-left: 20px;
  margin-right: 20px;
  height: 70%;
}

.texto-botton {
  text-align: center;
  margin: 0 0 16px;
  color: black;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-bottom: 50px;
}
.texto-nosotros {
  text-align: center;
  margin: 0 0 16px;
  color: black;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-bottom: 50px;
}
.titulo {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}

.registro {
  background-color: #251886;
  color: white;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  padding: 20px 0;
  min-height: 200px;
}

.banners {
  background-color: white;
}
.subtitulo {
  color: black;
}

.tarjeta {
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.form-control {
  width: 100%;
}
.container {
  max-width: 100%;
  height: 70%;
}

@media screen and (max-width: 767px) {
  .row {
    flex-direction: column;
    align-items: center;
  }

  .col-md-4 {
    max-width: 100%;
    margin-bottom: 20px;
  }
  .img-fluid {
    margin-top: -90px;
  }

  .tarjeta {
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
    width: 100%;
  }
  .container {
    max-width: 100%;
  }

  .container button {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 6.25rem;
    background: #251886;
    color: #fff;
    height: 3rem;
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    cursor: pointer;
    border: none;
    align-items: center;
    position: relative;
  }
}
</style>
