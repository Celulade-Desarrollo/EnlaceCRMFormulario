<script setup>
import { FormKit } from '@formkit/vue';
</script>

<template>
  <!-- Select de generos -->
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
</template>

<style scoped>


@media (max-width: 767px) {

}
</style>
