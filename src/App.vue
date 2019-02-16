<template>
  <v-app dark>
    <!--
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    -->
    <SideBar avatar="https://i.redd.it/spo5q1n66gg11.jpg" />
    <NavBar />
    <v-content>
      <v-container grid-list-lg>
        <step />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import step from "./components/step";

export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    step
  },
  data() {
    return {
      //
    };
  }
};
</script>
