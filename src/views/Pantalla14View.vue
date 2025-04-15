<script setup>
import { FormKit } from '@formkit/vue';
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";


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
        label="Nivel Educativo"
        placeholder="Seleccione"
        name="nivelEducativo"
        :options="{
          basico: 'Básico Primaria',
          bachillerato: 'Bachillerato',
          tecnico: 'Técnico',
          tecnologo: 'Tecnólogo',
          profesional: 'Profesional',
          posgrado: 'Posgrado',
        }"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione un campo',
        }"
      />
      <FormKit
        type="select"
        label="Estrato"
        placeholder="Seleccione"
        name="estrato"
        :options="{
          1: 'Estrato 1',
          2: 'Estrato 2',
          3: 'Estrato 3',
          4: 'Estrato 4',
          5: 'Estrato 5',
          6: 'Estrato 6',
        }"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione un campo',
        }"
      />
      <FormKit
        type="select"
        name="grupoEtnico"
        label="Grupo Étnico"
        placeholder="Seleccione"
        :options="{
          afrocolombiano: 'Afrocolombiano',
          indigena: 'Indígena',
          raizal: 'Raizal',
          palenquero: 'Palenquero',
          gitano: 'Gitano',
          otro: 'Otro',
        }"
        validation="required"
        validation-visibility="dirty"
        :validation-messages="{
          required: 'Seleccione un campo',
        }"
      />
      <FormKit
        type="select"
        name="declarasRenta"
        label="¿Declara Renta?"
        placeholder="Seleccione"
        :options="{
          si: 'Sí',
          no: 'No',
        }"
        validation="required"
        validation-visibility="dirty"
      />
      <FormKit
        type="select"
        name="Rut"
        label="¿Esta obligado a tener RUT por tu actividad económica?"
        placeholder="Seleccione"
        :options="{
          si: 'Sí',
          no: 'No',
        }"
        validation="required"
        validation-visibility="dirty"
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
