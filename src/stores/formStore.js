// stores/formStore.js
import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    formData: {}
  }),
  actions: {
    updateField(key, value) {
      this.formData[key] = value
    },
    getFinalData() {
      return this.formData
    }
  }
})
