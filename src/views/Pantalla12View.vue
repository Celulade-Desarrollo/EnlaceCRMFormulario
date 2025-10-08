<script setup>
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { ref, onMounted, computed } from "vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from "../stores/formStore.js";

const store = useFormularioStore();
const router = useRouter();
const formStore = useFormStore();

const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");
const ingresos = ref("");

// 🧮 Mapa de rangos a valores promedio diarios
const promedioIngresos = {
  "Menos de $100.000": 80000,
  "Entre $100.000 y $200.000": 150000,
  "Entre $200.000 y $300.000": 250000,
  "Entre $300.000 y $400.000": 350000,
  "Más de $400.000": 450000,
};

// 💰 Calcular el ingreso mensual formateado para mostrar
const ingresoMensualFormateado = computed(() => {
  if (!ingresos.value) return "";
  const valorPromedio = promedioIngresos[ingresos.value] || 0;
  const ingresoMensual = valorPromedio * 30;
  return ingresoMensual.toLocaleString('es-CO');
});

// ✅ Cuando se selecciona un checkbox
const handleCheckboxChange = (event) => {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });

  ingresos.value = event.target.value;
};

// ✅ Cuando se hace clic en "Continuar"
const handleSubmit = (event) => {
  event.preventDefault();

  const checkboxes = document.querySelectorAll(".single-checkbox");
  const algunoSeleccionado = Array.from(checkboxes).some((cb) => cb.checked);

  if (!algunoSeleccionado || !ingresos.value) {
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor selecciona una opción.";
    setTimeout(() => (mostrarAlerta.value = false), 3000);
    return;
  }

  // 🧮 Calcular ingreso mensual
  const valorPromedio = promedioIngresos[ingresos.value] || 0;
  const ingresoMensual = valorPromedio * 30;

  // 💰 Formatear con puntos para guardar en BD
  const ingresoFormateado = ingresoMensual.toLocaleString('es-CO');

  // 🧩 Guardar el valor formateado (con puntos como string)
  formStore.updateField("Rango_de_Ingresos", ingresoFormateado);

  console.log("📊 Guardando ingreso mensual:", {
    Seleccion: ingresos.value,
    IngresoNumerico: ingresoMensual,
    IngresoGuardado: ingresoFormateado,
    Tipo: typeof ingresoFormateado,
  });

  // 📨 Continuar al siguiente paso
  store.completarFormulario();
  router.push("/informacionFinanciera");
};

// ✅ Inicialización al montar la vista
onMounted(() => {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  const miRuta = window.location.pathname;
  localStorage.setItem("ruta", miRuta);
});
</script>


<template>
  <div>
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
              <h2 class="titulo">Cúentanos un poco </h2>
              <p class="mb-4 font-bold">
                Esta información es totalmente confidencial y esta nos permitirá
                conocerte mejor
              </p>
            </div>

            <div class="mt-4 tarjeta">
              <p class="mb-4 font-bold">¿Cuanto vendes al día?</p>
              <div class="checklist">
                <label class="check-item mb-4">
                  <input
                    type="checkbox"
                    name="ingresos"
                    value="Menos de $100.000"
                    class="single-checkbox"
                    :checked="ingresos === 'Menos de $100.000'"
                  />
                  <span class="checkmark"></span>
                  Menos de $100.000
                </label>

                <label class="check-item mb-4">
                  <input
                    type="checkbox"
                    name="ingresos"
                    value="Entre $100.000 y $200.000"
                    class="single-checkbox"
                    :checked="ingresos === 'Entre $100.000 y $200.000'"
                  />
                  <span class="checkmark"></span>
                  Entre $100.000 y $200.000
                </label>

                <label class="check-item mb-4">
                  <input
                    type="checkbox"
                    name="ingresos"
                    value="Entre $200.000 y $300.000"
                    class="single-checkbox"
                    :checked="ingresos === 'Entre $200.000 y $300.000'"
                  />
                  <span class="checkmark"></span>
                  Entre $200.000 y $300.000
                </label>

                <label class="check-item mb-4">
                  <input
                    type="checkbox"
                    name="ingresos"
                    value="Entre $300.000 y $400.000"
                    class="single-checkbox"
                    :checked="ingresos === 'Entre $300.000 y $400.000'"
                  />
                  <span class="checkmark"></span>
                  Entre $300.000 y $400.000
                </label>

                <label class="check-item mb-4">
                  <input
                    type="checkbox"
                    name="ingresos"
                    value="Más de $400.000"
                    class="single-checkbox"
                    :checked="ingresos === 'Más de $400.000'"
                  />
                  <span class="checkmark"></span>
                  Más de $400.000
                </label>

                <Button @click="handleSubmit" class="mt-5"></Button>
                <p v-if="mostrarAlerta" class="text-danger mt-1">
                  {{ mensajeAlerta }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
    <Footer class="bottom-0 left-0 right-0"></Footer>
  </div>
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
  justify-content: center;
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
