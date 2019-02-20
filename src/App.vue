<template>
  <v-app>
    <SideBar />
    <!-- <NavBar /> -->
    <v-content>
      <v-container grid-list-lg>
        <step />
      </v-container>
    </v-content>
    <Dialog />
  </v-app>
</template>

<script>
import step from "./components/step";
import SideBar from "./components/SideBar";
import Dialog from "./components/dialog";

export default {
  name: "App",
  components: {
    step,
    SideBar,
    Dialog
  },
  data() {
    return {
      //
    };
  }
};
</script>
