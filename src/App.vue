<template>
  <v-app>
    <SideBar />
    <v-content>
      <v-container grid-list-md>
        <step />

        <Time />
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
