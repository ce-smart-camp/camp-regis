<template>
  <v-app>
    <SideBar />
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

    <Loader />
    <Dialog />
  </v-app>
</template>

<script>
import step from "./components/step";
import SideBar from "./components/SideBar";
import Time from "./components/time";

// dialogs
import Loader from "./components/loader";
import Dialog from "./components/dialog";

export default {
  name: "App",
  components: {
    step,
    SideBar,
    Time,
    Loader,
    Dialog
  },
  data() {
    return {
      //
    };
  }
};
</script>
