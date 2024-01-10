<template>
  <div>
    <v-row class="mt-5 d-flex justify-center">
      <v-col cols="12" sm="8" md="6" xl="4">
        <v-card class="mb-6 green lighten-5">
          <v-card-text class="black--text subtitle-1 font-italic">Dolar App</v-card-text>
        <v-spacer></v-spacer>
        <v-img src="../assets/img/dolar.jpg"
        style="width: fit-content; height: 40px;" class="rounded-lg"/>
      </v-card>
        <v-card class="teal lighten-5 rounded-xl">
          <v-card-text
            class="display-1 text-uppercase teal lighten-1 white--text text-center"
          >
            <span v-if="!registro">Ingreso</span>
            <span v-if="registro">Registro</span>
          </v-card-text>
          <v-card-text>
            <v-btn class="mb-2 red lighten-1 white--text" block @click="google">
              <v-icon left dark>fab fa-google</v-icon>
              Google
            </v-btn>
            <v-btn block class="white--text blue darken-4" @click="facebook">
              <v-icon left dark>fab fa-facebook-f</v-icon>
              Facebook
            </v-btn>
          </v-card-text>

          <v-card-text>
            <v-btn
              block
              color="black white--text"
              @click="registro = true"
              v-if="!registro"
              >¿No tenes una cuenta? Registrate aquí</v-btn
            >
            <v-btn
              block
              color="black white--text"
              @click="registro = false"
              v-if="registro"
              >¿Ya tenes una cuenta? Ingresa aquí</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { firebase, auth } from "@/firebase";
import { mapMutations } from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      registro: false,
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    facebook() {
      console.log("Face");
      const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider);
    },
    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },

    async ingresar(provider) {
      firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Construcción de usuario
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL,
        };

        await this.nuevoUsuario(usuario);
        router.push({ name: "home" });
        
        redirigir()
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>