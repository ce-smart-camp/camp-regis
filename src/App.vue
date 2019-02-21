<template>
  <v-app>
    <SideBar />
    <!-- <NavBar /> -->
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <step />
          </v-flex>

          <v-flex xs12>
            <Time />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Dialog />
  </v-app>
</template>

<script>
import step from "./components/step";
import SideBar from "./components/SideBar";
import Dialog from "./components/dialog";
import Time from "./components/time";

export default {
  name: "App",
  components: {
    step,
    SideBar,
    Dialog,
    Time
  },
  data() {
    return {
      //
    };
  }
};
</script>
