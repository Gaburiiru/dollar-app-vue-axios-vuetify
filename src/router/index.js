import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ingreso",
    name: "ingreso",
    component: () =>
      import(/* webpackChunkName: "ingreso" */ "../views/Ingreso.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const usuario = auth.currentUser;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if (!usuario) {
      next({ path: "/ingreso" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
