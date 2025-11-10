<script setup>
import Heading from "../components/UI/Heading.vue";
import { motion } from "motion-v";
import { fadeInUp } from "../motion/PagesAnimation";
import { ref } from "vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormStore } from "../stores/formStore.js";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";

const store = useFormularioStore();
const bienes = ref("");
const deudas = ref("");
const gastos = ref("");
const error = ref("");
const ingresosSeleccionado = ref("");
const MontoIngresosDiferentes = ref("");
const deudaSeleccionada = ref("");
const MontoDeudaMensual = ref("");

const router = useRouter();
const formStore = useFormStore();

// 👉 Formateo automático mientras el usuario escribe
function formatCurrency(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // solo dígitos

  // Formatear con puntos cada 3 cifras
  const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  input.value = formatted;

  switch (input.id) {
    case "bienes":
      bienes.value = formatted;
      break;
    case "deudas":
      deudas.value = formatted;
      break;
    case "gastos":
      gastos.value = formatted;
      break;
    case "MontoIngresosDiferentes":
      MontoIngresosDiferentes.value = formatted;
      break;
    case "MontoDeudaMensual":
      MontoDeudaMensual.value = formatted;
      break;
  }
}

const handleSubmit = (event) => {
  event.preventDefault();

  // Validaciones básicas
  if (
    !bienes.value ||
    !deudas.value ||
    !gastos.value ||
    !deudaSeleccionada.value ||
    !ingresosSeleccionado.value ||
    (deudaSeleccionada.value === "Si" && !MontoDeudaMensual.value) ||
    (ingresosSeleccionado.value === "Si" && !MontoIngresosDiferentes.value)
  ) {
    error.value = "Por favor responde todas las preguntas antes de continuar.";
    setTimeout(() => (error.value = ""), 3000);
    return;
  }

  // 🧠 Guardar en el store (exactamente como debe llegar a la BD)
  formStore.updateField("Valor_Bienes", bienes.value);
  formStore.updateField("Valor_Deudas", deudas.value);
  formStore.updateField("Gastos_Mensuales", gastos.value);

  // 👉 Deuda mensual
  formStore.updateField("Deuda_Mensual", deudaSeleccionada.value);
  formStore.updateField(
    "Monto_Mensual_Deuda",
    deudaSeleccionada.value === "Si" ? MontoDeudaMensual.value : ""
  );

  // 👉 Ingresos diferentes
  formStore.updateField("Ingresos_Diferentes_Negocio", ingresosSeleccionado.value);
  formStore.updateField(
    "Monto_ingresos_diferentes_negocio",
    ingresosSeleccionado.value === "Si" ? MontoIngresosDiferentes.value : ""
  );

  console.log("💰 Valor_Bienes:", bienes.value);
  console.log("💳 Valor_Deudas:", deudas.value);
  console.log("🏠 Gastos_Mensuales:", gastos.value);
  console.log("❓ Deuda_Mensual:", deudaSeleccionada.value);
  console.log("💵 Monto_Deuda_Mensual:", MontoDeudaMensual.value);
  console.log("❓ Ingresos_Diferentes_Negocio:", ingresosSeleccionado.value);
  console.log("💸 Monto_Ingresos_Diferentes:", MontoIngresosDiferentes.value);

  store.completarFormulario();
  router.push("/antesDeTerminar");
};
</script>



<template>
<Heading></Heading>
    <motion.div v-bind="fadeInUp">
<section
    class="container registro min-h-screen flex flex-col justify-between overflow-y-auto p-4"
>
    <div class="mt-4 tarjeta">
        
        <p class="mb-4 font-bold">¿Cuál es el valor total de tus bienes?</p>
        <div>
            <label for="bienes" class="input-label">
                <input
                    id="bienes"
                    v-model="bienes"
                    class="form-control"
                    aria-required="true"
                    name="bienes"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                    @input="formatCurrency"
                />
                <span class="floating-label"
                    >Ingresa el monto</span
                >
            </label>
            <p>Ten en cuenta tu casa, tu vehículo y todo lo que te pertenezca</p>
            <br>

        </div>
        
        <p class="mb-4 font-bold">¿Cuál es el valor total de tus préstamos y otros compromisos?</p>
        <div>
            <label for="deudas" class="input-label">
                <input
                    id="deudas"
                    v-model="deudas"
                    class="form-control"
                    aria-required="true"
                    name="deudas"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                    @input="formatCurrency"
                />
                <span class="floating-label"
                    >Ingresa el monto</span
                >
            </label>
            <p>Ten en cuenta tus prestamos tus otros compromisos financieros</p>
            <br>
        </div>
        
        <div class="button-container">
            <p class="font-bold">¿Tienes alguna deuda que pagues mensualmente?</p>
            <input
              v-model="deudaSeleccionada"
              type="radio"
              id="deuda-si"
              class="checkbox-hidden"
              name="deuda"
              value="Si"
            />
            <label for="deuda-si" class="button mt-4">Sí</label>
            <input
              v-model="deudaSeleccionada"
              type="radio"
              id="deuda-no"
              class="checkbox-hidden"
              name="deuda"
              value="No"
            />
            <label for="deuda-no" class="button mt-4">No</label>
        </div>

        <!-- Campo que aparece cuando selecciona "Sí" -->
        <div v-if="deudaSeleccionada === 'Si'"> 
            <p class="mb-4 font-bold">¿Cuál es el monto mensual que pagas por esa deuda?</p>
            <div>
                <label for="MontoDeudaMensual" class="input-label">
                    <input
                        id="MontoDeudaMensual"
                        v-model="MontoDeudaMensual"
                        class="form-control"
                        aria-required="true"
                        name="MontoDeudaMensual"
                        type="text"
                        placeholder=" "
                        autocomplete="off"
                        @input="formatCurrency"
                    />
                    <span class="floating-label">Ingresa el monto</span>
                </label>
            </div>
        </div>
        
        <div class="button-container">
            <p class="font-bold">¿Tienes otros ingresos diferentes a las ventas de tu negocio?</p>
              <input
              v-model= "ingresosSeleccionado"
              type="radio"
              id="ingreosE-si"
              class="checkbox-hidden"
              name="ingresosE"
              value="Si"
            />
            <label for="ingreosE-si" class="button mt-4">Si</label>
            <input
              v-model= "ingresosSeleccionado"
              type="radio"
              id="ingreosE-no"
              class="checkbox-hidden"
              name="ingresosE"
              value="No"
            />
            <label for="ingreosE-no" class="button mt-4">No</label>
        </div>
        
        <div v-if="ingresosSeleccionado === 'Si'"> 
            <p class="mb-4 font-bold">¿Cuál es el monto mensual de estos ingresos?</p>
            <div>
                <label for="MontoIngresosDiferentes" class="input-label">
                    <input
                        id="MontoIngresosDiferentes"
                        v-model="MontoIngresosDiferentes"
                        class="form-control"
                        aria-required="true"
                        name="MontoIngresosDiferentes"
                        type="text"
                        placeholder=" "
                        autocomplete="off"
                        @input="formatCurrency"
                    />
                    <span class="floating-label">Ingresa el monto</span>
                </label>
            </div>
        </div>
        
        <p class="mb-4 font-bold">¿Cuanto son tus gastos mensuales?</p>
        <div>
            <label for="gastos" class="input-label">
                <input
                    id="gastos"
                    v-model="gastos"
                    class="form-control"
                    aria-required="true"
                    name="gastos"
                    type="text"
                    placeholder=" "
                    autocomplete="off"
                    @input="formatCurrency"
                />
                <span class="floating-label"
                    >Ingresa el monto</span
                >
            </label>
            <p>Ten en cuenta lo que gastas en comida, servicios, colegio, transporte, entre otros</p>
        </div>
        
        <Button @click="handleSubmit" class="mt-5"></Button>
        <p v-if="error" class="text-danger mt-1 flex justify-center">
            {{ error }}
        </p>
    </div>
</section>
</motion.div>
<Footer class="bottom-0 left-0 right-0"></Footer>
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
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
}
.checkbox-hidden {
  display: none;
}

.checkbox-hidden:checked + label.button {
  background-color: #251786; /* azul */
  color: white;
}
.check-item input[type="checkbox"]:checked + .checkmark {
  background-color: #dd3590;
  border: 2px solid #dd3590;
}
.button {
  padding: 10px 20px;
  margin-right: 0.5rem;
  border-radius: 8px;
  border: 0px solid #ccc;
  cursor: pointer;
  background: #dd3590;
  color: #ffffff;
  transition: 0.3s;
  width: 80%;
  border-radius: 50px;
  margin-bottom: 0mm;
}
.button:hover {
  background-color: #f15bab;
}

</style>