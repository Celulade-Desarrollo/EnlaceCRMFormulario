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
      path: "/Pantalla2View",
      name: "pantalla2",
      component: () => import("../views/Pantalla2View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla3View",
      name: "pantalla3",
      component: () => import("../views/Pantalla3View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Pantalla4View",
      name: "pantalla4",
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
      path: "/Pantalla7View",
      name: "pantalla7",
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiereFormulario && !store.getters.formularioCompletado) {
//     alert("Completar formulario");
//   } else {
//     next();
//   }
// });

export default router;
