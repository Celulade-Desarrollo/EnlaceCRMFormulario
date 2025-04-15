<script setup>
import { FormKit } from '@formkit/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";

const departments = ref([]);
const error = ref('');
const paises = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    paises.value = response.data.map((pais) => ({
      value: pais.cca2,
      label: pais.name.common,
    })).sort((a, b) => a.label.localeCompare(b.label));
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
    error.value = 'Error al cargar los departamentos.';
    console.error('Error loading departments:', err);
  }
})


</script>

<template>
  <Heading></Heading>
  <h2 class="titulo">Datos Personales</h2>
  <!-- Select de generos -->
   <div>
      <FormKit
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
          is: 'Seleccione un campo',
      }"
      />
      <!-- Select de generos -->
      <FormKit
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
          is: 'Seleccione un campo',
        }"
      />
      <FormKit
        type="date"
        label="Fecha de Nacimiento"
        name="fechaNacimiento"
        help="Ejemplo: 1999-01-01"
        placeholder="Fecha de Nacimiento"
        validation="required|date_before:2010-01-01"
        validation-visibility="dirty"
      />
      <FormKit
        type="select"
        name="pais"
        label="País"
        placeholder="País de Nacimiento"
        :options="paises"
        validation="required"
        validation-visibility="dirty"
      />
      <FormKit
        type="select"
        name="departamento"
        label="Departamento"
        placeholder="Selecciona un departamento"
        :options="departments"
        validation="required"
        validation-visibility="dirty"
        class="formkit-department-select appearance-none bg-gray-100 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        
      />
    </div>
      <Button></Button>
</template>

<style scoped>
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
