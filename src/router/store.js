import { createStore } from "vuex";

export default createStore({
  state: {
    formularioCompletado: false,
  },
  mutations: {
    setFormularioCompletado(state, valor) {
      state.formularioCompletado = valor;
    },
  },
  actions: {
    completarFormulario({ commit }) {
      commit("setFormularioCompletado", true);
    },
  },
  getters: {
    formularioCompletado: (state) => state.formularioCompletado,
  },
});
