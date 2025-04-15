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


const onSubmit = (formData) => {
  if (!formData.genero ||
    !formData.estadoCivil ||
    !formData.fechaNacimiento ||
    !formData.pais ||
    !formData.departamento) {
    
    mostrarAlerta.value = 'Por favor completa todos los campos';
    mostrarAlerta.value = true;
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
});


</script>

<template>
  <Heading></Heading>
  <h2 class="titulo">Datos Personales</h2>

  

  <!-- Select de generos -->
   <FormKit type="form" 
        @submit="onSubmit" 
        :actions="false"
        :incomplete-message="'Por favor completa todos los campos'">
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
          required: 'Seleccione su género',
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
          required: 'Seleccione su estado civil',
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
        :validation-messages="{
          required: 'Coloque una fecha válida',
        }"
      />
      <FormKit
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
      />
      <FormKit
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
      />
      <Button type="submit"></Button>
      
    </FormKit>

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
