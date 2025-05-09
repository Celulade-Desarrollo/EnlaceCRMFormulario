import { defineStore } from "pinia";
const ultimaRuta = localStorage.getItem("ruta");
export const useFormularioStore = defineStore("formulario", {
  state: () => ({
    formularioCompletado: false,
    ultimaRutaValida: ultimaRuta,
  }),
  actions: {
    completarFormulario() {
      this.formularioCompletado = true;
    },
    actualizarRutaValida(ruta) {
      this.ultimaRutaValida = ruta;
    },
  },
});
