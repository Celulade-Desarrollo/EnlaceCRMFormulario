import { createRouter, createWebHistory } from "vue-router";
import InicioView from "../views/InicioView.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
    },
    {
      path: "/correoElectronico",
      name: "correoElectronico",
      component: () => import("../views/Pantalla2View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/nombres",
      name: "nombres",
      component: () => import("../views/Pantalla3View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/cedula",
      name: "cedula",
      component: () => import("../views/Pantalla4View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla5View",
      name: "pantalla5",
      component: () => import("../views/Pantalla5View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla6View",
      name: "pantalla6",
      component: () => import("../views/Pantalla6View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/negocio",
      name: "negocio",
      component: () => import("../views/Pantalla7View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla8View",
      name: "pantalla8",
      component: () => import("../views/Pantalla8View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla9View",
      name: "pantalla9",
      component: () => import("../views/Pantalla9View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla10View",
      name: "pantalla10",
      component: () => import("../views/Pantalla10View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla11View",
      name: "pantalla11",
      component: () => import("../views/Pantalla11View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla12View",
      name: "pantalla12",
      component: () => import("../views/Pantalla12View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla13View",
      name: "pantalla13",
      component: () => import("../views/Pantalla13View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla14View",
      name: "pantalla14",
      component: () => import("../views/Pantalla14View.vue"),
      meta: { requiereFormulario: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiereFormulario && !store.getters.formularioCompletado) {
    next();
  } else {
    next(); // Permite continuar a la ruta deseada
  }
});

export default router;
