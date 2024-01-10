<template>
  <div>
    <v-container>
      <v-toolbar class="mb-6 green lighten-5">
        <router-link :to="{ name: 'home' }" class="text-decoration-none">
          <span class="black--text">Dolar App</span>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="cerrarSesion">
          <span>cerrar sesion</span>
          <v-icon class="ml-2"> fa-solid fa-address-book </v-icon>
        </v-btn>
      </v-toolbar>
    </v-container>
    <h3 class="subtitle-1 font-italic">Bienvenid@ {{usuario.nombre}}</h3>
    <v-row :wrap="true">
      <v-col xs12>
        <v-card class="mt-5">
          <v-date-picker
            v-model="fecha"
            full-width
            locale="es-ar"
            :min="minimo"
            :max="maximo"
            @change="getDolar(fecha)"
          >
          </v-date-picker>
        </v-card>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-center">{{ valor }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState,mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      fecha: new Date().toISOString().substring(0, 10),
      minimo: "1984",
      maximo: new Date().toISOString().substring(0, 10),
      valor: null,
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),

    async getDolar(dia) {
      let arrayfecha = dia.split(["-"]);
      let ddmmyy = arrayfecha[2] + "-" + arrayfecha[1] + "-" + arrayfecha[0];

      try {
        this.mostrarLoading({
          titulo: "Accediendo a informacion",
          color: "secondary",
        });
        let datos = await axios.get(
          `https://mindicador.cl/api/dolar/${ddmmyy}`
        );
        if (datos.data.serie.length > 0) {
          this.valor = await datos.data.serie[0].valor;
        } else {
          this.valor = "Sin resultados";
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.ocultarLoading();
      }
    },
  },
  created() {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    this.getDolar(this.fecha);
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>
