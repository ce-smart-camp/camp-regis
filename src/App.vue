<template>
  <v-app>
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
    <SideBar />
    <!-- <NavBar /> -->
    <v-content>
      <v-container grid-list-lg>
        <step />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import step from "./components/step";

import SideBar from "./components/SideBar";

export default {
  name: "App",
  components: {
    step,
    SideBar
  },
  data() {
    return {
      //
    };
  }
};
</script>
