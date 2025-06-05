<script setup>
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { onMounted, ref } from "vue";
import { useFormularioStore } from "../router/store";
import { useRouter } from "vue-router";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { useFormStore } from '../stores/formStore.js'

const formStore = useFormStore()
const datosFinales = ref({})

const error = ref("");
const store = useFormularioStore();
const router = useRouter();

// Resultado:
console.log(datosFinales)

const handleCheckboxChange = (event) => {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });
};

const handleCheckboxChange1 = (event) => {
  const checkboxes = document.querySelectorAll(".single-checkbox-1");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });
};

const handleCheckboxChange2 = (event) => {
  const checkboxes = document.querySelectorAll(".single-checkbox-2");
  checkboxes.forEach((checkbox) => {
    if (checkbox !== event.target) {
      checkbox.checked = false;
    }
  });
};

const validateCheckboxes = () => {
  const group1Checked = Array.from(
    document.querySelectorAll(".single-checkbox")
  ).some((checkbox) => checkbox.checked);
  const group2Checked = Array.from(
    document.querySelectorAll(".single-checkbox-1")
  ).some((checkbox) => checkbox.checked);
  const group3Checked = Array.from(
    document.querySelectorAll(".single-checkbox-2")
  ).some((checkbox) => checkbox.checked);
  return group1Checked && group2Checked && group3Checked;
};

onMounted(() => {
  datosFinales.value = formStore.getFinalData()

  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });

  const checkboxes1 = document.querySelectorAll(".single-checkbox-1");
  checkboxes1.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange1);
  });

  const checkboxes2 = document.querySelectorAll(".single-checkbox-2");
  checkboxes2.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange2);
  });

  let miRuta = window.location.pathname;

  // Validar si ya existe "ruta"
  if (localStorage.getItem.length > 0) {
    localStorage.removeItem("ruta");

    // Setear la ruta por defecto
    localStorage.setItem("ruta", miRuta);
  } else {
    // Setear la ruta por defecto
    localStorage.setItem("ruta", miRuta);
  }
});

const handleSubmit = (event) => {
  if (!validateCheckboxes())
  {
    event.preventDefault(); // Prevent form submissio
  const persona = document.querySelector(".single-checkbox:checked")?.value;
  const familiar = document.querySelector(".single-checkbox-1:checked")?.value;
  const moneda = document.querySelector(".single-checkbox-2:checked")?.value;

  const personaValue = clearUndefined(persona);
  const familiarValue = clearUndefined(familiar);
  const monedaValue = clearUndefined(moneda);

    error.value =
      "Por favor, selecciona al menos una opción de los tres grupos.";


    setTimeout(() => {
      error.value = "";
    }, 3000);
    return false;
  }

  // Limpiar error si no lo hay
  error.value = "";
  event.preventDefault(); // Evita el envío del formulario por defecto
  store.completarFormulario(); // Marca el formulario como completado
  console.log('Datos listos para enviar:', datosFinales.value)
  router.push("/Terminado"); // Redirige a la siguiente pantalla
  formStore.updateField('Persona_Expuesta_Politicamente', document.querySelector(".single-checkbox:checked")?.value);
  formStore.updateField('Familiar_PEP', document.querySelector(".single-checkbox-1:checked")?.value);
  formStore.updateField('Moneda_Extranjera', document.querySelector(".single-checkbox-2:checked")?.value);
};
</script>

<template>
  <Heading class="mb-[40px]"></Heading>
  <motion.div v-bind="fadeInUp">
    <section class="container py-5 registro">
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
        <div class="col-lg-6">
          <div class="mt-4 tarjeta">
            <form>
              <div class="form-group">
                <h3 class="titulo-10 mb-4">Antes de terminar</h3>
                <h6 class="mb-4 font-bold">
                  Falta poco. Solo necesitamos que respondas un par de preguntas
                  más
                </h6>
                <h4 class="sub-titulo">
                  ¿Eres una Persona Expuesta Politicamente (PEP) o lo has sido
                  en los ultimos años?
                </h4>
                <div class="checklist m-0" aria-required="true">
                  <label class="check-item">
                    <input
                      type="checkbox"
                      name="pep"
                      value="si"
                      class="single-checkbox"
                    />
                    <span class="checkmark"></span>
                    Si
                  </label>
                  <label class="check-item mb-4">
                    <input
                      type="checkbox"
                      name="pep"
                      value="no"
                      class="single-checkbox"
                      checked
                    />
                    <span class="checkmark"></span>
                    No
                  </label>
                </div>
                <h4 class="sub-titulo">
                  ¿Tu pareja, familiar directo o asociado cercano es una Persona
                  Expuesta Politicamente (PEP) o lo has sido en los ultimos
                  años?
                </h4>
                <p class="font-bold">
                  Tu familia directa incluye padres, hermanos, abuelos o nietos
                </p>
                <div class="checklist m-0" aria-required="true">
                  <label class="check-item">
                    <input
                      type="checkbox"
                      name="familiar_pep"
                      value="si"
                      class="single-checkbox-1"
                    />
                    <span class="checkmark"></span>
                    Si
                  </label>
                  <label class="check-item mb-4">
                    <input
                      type="checkbox"
                      name="familiar_pep"
                      value="no"
                      class="single-checkbox-1"
                      checked
                    />
                    <span class="checkmark"></span>
                    No
                  </label>
                </div>
                <h3 class="titulo mb-4">
                  ¿Realiza operaciones en moneda extranjera?
                </h3>
                <div class="checklist m-0" aria-required="true">
                  <label class="check-item">
                    <input
                      type="checkbox"
                      name="MonedaExtranjeraSi"
                      value="si"
                      class="single-checkbox-2"
                    />
                    <span class="checkmark"></span>
                    Si
                  </label>
                  <label class="check-item mb-4">
                    <input
                      type="checkbox"
                      name="MonedaExtranjeraNo"
                      value="no"
                      class="single-checkbox-2"
                      checked
                    />
                    <span class="checkmark"></span>
                    No
                  </label>
                </div>
                <p>
                  Declaro que soy nacido en Colombia, no tengo otras
                  nacionalidades, y mi domicilio es en Colombia al igual que mi
                  país de residencia físcal. Con el fin de de dar cumplimiento a
                  la normatividad de FATCA/CRS certifico lo anterior y me
                  comprometo a suministrar cualquier cambio de forma oprotuna.
                </p>
              </div>
              <Button @click="handleSubmit"></Button>
              <p v-if="error" class="text-danger mt-1 flex justify-center">
                {{ error }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
  <Footer class="bottom-0 left-0 right-0"></Footer>
</template>

<style scoped>
.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 30px 8px 0;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23495057" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E');
  background-position: right 12px center;
  background-size: 16px 12px;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
  cursor: pointer;
}
.custom-select:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}

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
.container {
  background-color: white;
  color: #111111;
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
  color: gray;
  font-size: 1rem;
  margin-bottom: 15px;
}
.checklist {
  max-width: 300px;
  margin-top: 30px;
  margin: 0 auto;
}
.titulo-10 {
  margin: 0 0 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  margin-top: -100px;
}
.sub-titulo {
  font-weight: bold;
  font-size: larger;
  margin-bottom: 15px;
}
.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
}
.check-item input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}
.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 10px;
  position: relative;
}
.check-item input[type="checkbox"]:checked + .checkmark {
  background-color: #dd3590;
  border: 2px solid #dd3590;
}
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
