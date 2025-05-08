<script setup>
import { FormKit } from '@formkit/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";

const departments = ref([]);
const paises = ref([]);
const mostrarAlerta = ref(false);
const mensajeAlerta = ref('');
const countrySelect = ref(null);
const departmentSelect = ref(null);
const genero = ref(''); // Refs para almacenar los valores de los campos
const estadoCivil = ref('');
const fechaNacimiento = ref('');
const paisSeleccionado = ref('');
const departamentoSeleccionado = ref('');

const onSubmit = (formData) => {
  if (!genero.value ||
      !estadoCivil.value ||
      !fechaNacimiento.value ||
      !paisSeleccionado.value ||
      !departamentoSeleccionado.value) {
    mostrarAlerta.value = true;
    mostrarAlerta.value = 'Por favor completa todos los campos';
    return;
  }
  mostrarAlerta.value = false;
  window.location.href = 'Pantalla14View';
};

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const listaPaises = response.data.map((pais) => ({
      value: pais.cca2,
      label: pais.name.common,
    }));
    
    // Encontrar Colombia y moverla al principio de la lista
    const indiceColombia = listaPaises.findIndex(pais => pais.value === 'CO');
    if (indiceColombia !== -1) {
      const colombia = listaPaises.splice(indiceColombia, 1)[0];
      listaPaises.unshift(colombia); // Añadir Colombia al principio
    }
    
    paises.value = listaPaises;
    if (countrySelect.value) {
      listaPaises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.value;
        option.text = pais.label;
        countrySelect.value.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error al cargar países:', error)
  }
  
  try {
    const response = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento&$order=departamento');
    departments.value = response.data.map(item => ({
      value: item.departamento,
      label: item.departamento,
    }));
  } catch (err) {
    console.error('Error loading departments:', err);
  }
  try {
    const response = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento&$order=departamento');
    const listaDepartamentos = response.data.map(item => ({
      value: item.departamento,
      label: item.departamento,
    }));

    departments.value = listaDepartamentos;

    // Poblamos el select de departamentos
    if (departmentSelect.value) {
      listaDepartamentos.forEach(dep => {
        const option = document.createElement('option');
        option.value = dep.value;
        option.text = dep.label;
        departmentSelect.value.appendChild(option);
      });
    }
  } catch (err) {
    console.error('Error loading departments:', err);
  }
});


</script>

<template>
  <Heading></Heading>
  <h2 class="titulo">Datos Personales</h2>

  <!-- Select de generos -->
  <form @submit.prevent="onSubmit">
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

      <label for="fechaNacimiento">Fecha de Nacimiento</label>
      <label for="fechaNacimiento" class="form-example-text">Ejemplo: 1999-01-01</label>
      <div class="custom-date">
        <input v-model="fechaNacimiento" type="date" name="fechaNacimiento" class="custom-input-date">
      </div>

      <label for="paisNacimiento">País de Nacimiento</label>
      <div class="custom-select-wrapper">
        <select v-model="paisSeleccionado" class="custom-select" name="pais" ref="countrySelect">
          <option selected disabled value="">Selecciona tu país</option>
        </select>
      </div>

      <label for="departamento">Departamento</label>
      <div class="custom-select-wrapper">
        <select v-model="departamentoSeleccionado" class="custom-select" name="departamento" ref="departmentSelect">
          <option selected disabled value="">Selecciona un departamento</option>
        </select>
      </div>
    </div>
    <Button type="submit"></Button>
  </form>
  <!--  <FormKit type="form" 
        @submit="onSubmit" 
        :actions="false"
        :incomplete-message="'Por favor completa todos los campos'"> -->
      <!-- <FormKit
        type="select"
        label="Género"
        placeholder="Seleccione"
        name="genero"
        :options="{
          masculino: 'Masculino',
          venus: 'Femenino',
          Otro: 'Otro',
        }"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione su género',
      }"
      /> -->
      <!-- Select de generos -->
     <!--  <FormKit
        type="select"
        label="Estado Cívil"
        placeholder="Seleccione"
        name="estadoCivil"
        :options="{
          soltero: 'Soltero/a',
          casado: 'Casado/a',
          divorciado: 'Divorciado/a',
          viudo: 'Viudo/a',
          unionLibre: 'Unión Libre (o Concubinato)',
          separado: 'Separado',
        }"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione su estado civil',
        }"
      /> -->
     <!--  <FormKit
        type="date"
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        help="Ejemplo: 1999-01-01"
        placeholder="Fecha de Nacimiento"
        validation="required|date_before:2010-01-01"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Coloque una fecha válida',
        }"
      /> -->
      <!-- <FormKit
        type="select"
        name="pais"
        label="País"
        placeholder="País de Nacimiento"
        :options="paises"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione un país',
        }"
      /> -->
    <!--   <FormKit
        type="select"
        name="departamento"
        label="Departamento"
        placeholder="Selecciona un departamento"
        :options="departments"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione un departamento',
        }"
      /> -->
      
      
    <!-- </FormKit> -->

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


.form-group {
  margin-left: 20px;
  margin-right: 20px;
}


.custom-date {
  position: relative;
  margin-bottom: 24px;
  width: 100%;
}

.custom-input-date {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
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
