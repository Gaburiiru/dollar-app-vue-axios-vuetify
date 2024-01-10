import { auth } from "@/firebase";
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: {
      titulo: "",
      estado: false,
      color: "black",
    },
    usuario: "",
  },
  getters: {},
  mutations: {
    nuevoUsuario(state, payload){
      if(payload === null){
        state.usuario=''
      }else{
        state.usuario = payload
      }
    },
    mostrarLoading(state, payload) {
      state.loading.titulo = payload.titulo;
      state.loading.estado = payload.color;
      state.loading.estado = true;
    },
    ocultarLoading(state) {
      state.loading.estado = false;
    },
  },
  actions: {
    setUsuario({ commit }, user) {
      const usuario = {
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        foto: user.photoURL,
      };
      commit("nuevoUsuario", usuario);
    },
    cerrarSesion({ commit }) {
      
      auth.signOut();
      commit("nuevoUsuario", null);
      router.push({ name: "ingreso" });
    },
  },
  modules: {},
});
