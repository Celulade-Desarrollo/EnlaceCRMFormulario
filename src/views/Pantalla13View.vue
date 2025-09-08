<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFormularioStore } from "../router/store";
import axios from "axios";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import Footer from "../components/UI/Footer.vue";
import { useFormStore } from '../stores/formStore.js'

//formulario global
const formStore = useFormStore()

const store = useFormularioStore();
const router = useRouter();
const departments = ref([]);
const departamentoSeleccionado = ref("");
const paisSeleccionado = ref("");
const errorMessage = ref("");
const mostrarAlerta = ref(false);
const mensajeAlerta = ref("");

const genero = ref(""); 
const estadoCivil = ref("");
const fechaNacimiento = ref("");
const maxFechaNacimiento = ref("");
const nombrePareja = ref("");
const apellidoPareja = ref("");
const cedulaPareja = ref("");

const handleSubmit = (event) => {
  event.preventDefault(); // Evita el envío desde el inicio

  if (
    !genero.value ||
    !estadoCivil.value ||
    !fechaNacimiento.value ||
    !paisSeleccionado.value ||
    !departamentoSeleccionado.value ||
    ((estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") &&
      (!nombrePareja.value || !apellidoPareja.value || !cedulaPareja.value))
  ) {
    // Guardar los datos hasta donde existan
    formStore.updateField('Genero', genero.value);
    formStore.updateField('Estado_Civil', estadoCivil.value);
    formStore.updateField('Fecha_de_Nacimiento', fechaNacimiento.value);
    formStore.updateField('Pais_de_Nacimiento', paisSeleccionado.value);
    formStore.updateField('Departamento_de_Nacimiento', departamentoSeleccionado.value);

    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor completa todos los campos.";
    setTimeout(() => {
      mensajeAlerta.value = "";
      mostrarAlerta.value = false;
    }, 3000);
    return;
  }
   if (
    (estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") &&
    (
      !nombrePareja.value ||
      !apellidoPareja.value ||
      !cedulaPareja.value
    )
  ) {
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor completa los datos de tu pareja.";
    setTimeout(() => {
      mensajeAlerta.value = "";
    }, 3000);
    return;
  }
   if (
    (estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") &&
    (
      String(cedulaPareja.value).length < 6 || String(cedulaPareja.value).length > 10
    )
  ) {
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "La cédula de tu pareja debe tener entre 6 y 10 números.";
    setTimeout(() => {
      mensajeAlerta.value = "";
    }, 3000);
    return;
  }
   if (
    (estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") &&
    (
      !nombrePareja.value ||
      !apellidoPareja.value ||
      !cedulaPareja.value
    )
  ) {
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Por favor completa los datos de tu pareja.";
    setTimeout(() => {
      mensajeAlerta.value = "";
    }, 3000);
    return;
  }
   if (
    (estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") &&
    (
      String(cedulaPareja.value).length < 6 || String(cedulaPareja.value).length > 10
    )
  ) {
    event.preventDefault();
    mostrarAlerta.value = true;
    mensajeAlerta.value = "La cédula de tu pareja debe tener entre 6 y 10 números.";
    setTimeout(() => {
      mensajeAlerta.value = "";
    }, 3000);
    return;
  }
  const fechaNacimientoDate = new Date(fechaNacimiento.value);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
  const mesDiferencia = fechaActual.getMonth() - fechaNacimientoDate.getMonth();
  const diaDiferencia = fechaActual.getDate() - fechaNacimientoDate.getDate();

  if (mesDiferencia < 0 || (mesDiferencia === 0 && diaDiferencia < 0)) {
    edad--;
  }

  if (edad < 18) {
    mostrarAlerta.value = true;
    mensajeAlerta.value = "Debes ser mayor de edad para continuar";
    return;
  }

  mensajeAlerta.value = "";
  mostrarAlerta.value = false;

  // Guardar todos los datos
  formStore.updateField('Genero', genero.value);
  formStore.updateField('Estado_Civil', estadoCivil.value);
  formStore.updateField('Fecha_de_Nacimiento', fechaNacimiento.value);
  formStore.updateField('Pais_de_Nacimiento', paisSeleccionado.value);
  formStore.updateField('Departamento_de_Nacimiento', departamentoSeleccionado.value);

  if (estadoCivil.value === "casado" || estadoCivil.value === "unionLibre") {
   formStore.updateField('Nombre_Conyuge', nombrePareja.value);
    formStore.updateField('Apellido_Conyuge', apellidoPareja.value);
    formStore.updateField('Cedula_Conyuge', cedulaPareja.value.toString());
  } 

  store.completarFormulario(); // Marca el formulario como completado
  formStore.updateField('Genero', genero.value)
  formStore.updateField('Estado_Civil', estadoCivil.value)
  formStore.updateField('Fecha_de_Nacimiento', fechaNacimiento.value)
  formStore.updateField('Pais_de_Nacimiento', paisSeleccionado.value)
  formStore.updateField('Departamento_de_Nacimiento', departamentoSeleccionado.value)

  router.push("/datosPersonales2"); // Redirige a la siguiente pantalla
};

onMounted(async () => {
  const hoy = new Date();
  hoy.setFullYear(hoy.getFullYear() - 18);
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  maxFechaNacimiento.value = `${yyyy}-${mm}-${dd}`;

  /*
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const listaPaises = response.data.map((pais) => ({
      value: pais.cca2,
      label: pais.name.common,
    }));

    const indiceColombia = listaPaises.findIndex((pais) => pais.value === "CO");
    if (indiceColombia !== -1) {
      const colombia = listaPaises.splice(indiceColombia, 1)[0];
      listaPaises.unshift(colombia);
    }

    paises.value = listaPaises;
  } catch (error) {
    console.error("Error al cargar países:", error);
  }
  */

  try {
    const response = await axios.get( "/api/ubicacion/departamentos");
    departments.value = response.data.map((item) => ({
      value: item.nombre,
      label: item.nombre,
    }));
  } catch (err) {
    console.error("Error al cargar los departamentos:", err);
  }

  let miRuta = window.location.pathname;

  // Corregir validación de existencia de "ruta"
  if (localStorage.getItem("ruta")) {
    localStorage.removeItem("ruta");
  }

  localStorage.setItem("ruta", miRuta);
});
</script>



<template>
  <Heading />
  <motion.div v-bind="fadeInUp">
    <h2 class="titulo">Datos Personales</h2>

    <!-- Select de generos -->
    <section class="min-h-screen flex flex-col justify-between">
      <form>
        <div class="form-group">
          <label for="genero">Género</label>
          <div class="custom-select-wrapper">
            <select v-model="genero" name="genero" class="custom-select">
              <option selected disabled value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <label for="estadoCivil">Estado civil</label>
          <div class="custom-select-wrapper">
            <select v-model="estadoCivil" name="estadoCivil" class="custom-select">
              <option selected disabled value="">Seleccione</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="unionLibre">Unión Libre (o Concubinato)</option>
              <option value="separado">Separado</option>
            </select>
          </div>
          <div v-if="estadoCivil === 'casado' || estadoCivil === 'unionLibre'">
              <div>
                <label for="nombrePareja" class="input-label" >
                  <input 
                    type="text" 
                    id="nombrePareja" 
                    v-model="nombrePareja" 
                    class="form-control" 
                    placeholder=" "
                  />
                  <span class="floating-label">Nombre de la pareja:</span>
                </label>
              </div>

              <div>
                <label for="apellidoPareja" class="input-label">
                  <input 
                    type="text" 
                    id="apellidoPareja" 
                    v-model="apellidoPareja"
                    class="form-control" 
                    placeholder=" "
                  />
                   <span class="floating-label">Apellido de la pareja:</span>
                </label>
              </div>
              <div>
                <label for="cedulaPareja" class="input-label">
                <input 
                  type="number"
                  id="cedulaPareja"
                  v-model.number="cedulaPareja"
                  class="form-control" 
                  placeholder=" "
                />
                <span class="floating-label">Cédula de la pareja:</span>
                </label>
              </div>
        </div>
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <div class="custom-date">
            <input
              v-model="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              class="custom-input-date"
              :max="maxFechaNacimiento"
            />
          </div>

          <label for="paisNacimiento">País de Nacimiento</label>
          <div class="custom-select-wrapper">
            <select v-model="paisSeleccionado" class="custom-select" name="pais">
              <option selected disabled value="">Selecciona tu país</option>
              <option value="colombia">Colombia</option>
            </select>
          </div>

          <label for="departamento">Departamento</label>
          <div class="custom-select-wrapper">
            <select
              v-model="departamentoSeleccionado"
              class="custom-select"
              name="departamento"
            >
              <option selected disabled value="">
                Selecciona un departamento
              </option>
              <option
                v-for="dep in departments"
                :key="dep.value"
                :value="dep.value"
              >
                {{ dep.label }}
              </option>
            </select>
          </div>

          <Button @click="handleSubmit" class="mt-5" />
          <p v-if="mostrarAlerta" class="text-danger mt-1 flex justify-center">
            {{ mensajeAlerta }}
          </p>
        </div>
      </form>
      <Footer class="bottom-0 left-0 right-0" />
    </section>
  </motion.div>
</template>

<style scoped>
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
.input-label {
  position: relative;
  display: block;
  width: 100%;
  margin-top: 24px;
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
.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #09008be1;
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
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.form-group label:not(:first-child) {
  margin-top: 16px;
}

.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #09008be1;
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

.form-group {
  margin-left: 20px;
  margin-right: 20px;
}

.form-group button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: #fff;
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  outline: none;
  align-items: center;
  text-align: center;
  overflow: hidden;
  border: none;
  transform: translate3d(0, 0, 0);
}

.custom-date {
  position: relative;
  margin-bottom: 24px;
  width: 100%;
}

.custom-input-date {
  appearance: none;
  border: none;
  border-bottom: 2px solid #09008be1;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 0;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
}

.custom-input-date:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}

.custom-input-date::-webkit-calendar-picker-indicator {
  color: #495057;
  cursor: pointer;
}

.custom-input-date::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.titulo {
  margin: 16px;
  color: inherit;
  font-weight: bold;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}

@media (max-width: 767px) {
}
</style>
