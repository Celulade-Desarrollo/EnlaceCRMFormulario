import { createRouter, createWebHistory } from "vue-router";
import InicioView from "../views/InicioView.vue";
import { useFormularioStore } from "./store";

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
      path: "/ubicacion",
      name: "ubicacion",
      component: () => import("../views/Pantalla8View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/informacionNegocio",
      name: "informacionNegocio",
      component: () => import("../views/Pantalla9View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/antesDeTerminar",
      name: "antesDeTerminar",
      component: () => import("../views/Pantalla10View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/Terminado",
      name: "Terminado",
      component: () => import("../views/Pantalla11View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/ventas",
      name: "ventas",
      component: () => import("../views/Pantalla12View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/datosPersonales",
      name: "datosPersonales",
      component: () => import("../views/Pantalla13View.vue"),
      meta: { requiereFormulario: true },
    },
    {
      path: "/datosPersonales2",
      name: "datosPersonales2",
      component: () => import("../views/Pantalla14View.vue"),
      meta: { requiereFormulario: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useFormularioStore();

  const requiereFormulario = to.meta.requiereFormulario;

  if (requiereFormulario && !store.formularioCompletado) {
    store.completarFormulario();
    next(store.ultimaRutaValida || "/");
  } else {
    store.actualizarRutaValida(to.fullPath);
    next();
  }
});

export default router;
