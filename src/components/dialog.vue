<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        {{ msg }}
        <v-progress-linear indeterminate color="white" class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import bus from "./../core/bus";

export default {
  data: () => ({
    dialog: false,
    msg: "กำลังเตรียมพร้อม"
  }),
  watch: {
    dialog(val) {
      bus.$emit("dialog.change", val);
    }
  },
  created() {
    this.dialog = true;
  },
  mounted() {
    bus.$on("dialog.on", msg => {
      this.msg = msg;
      this.dialog = true;
    });

    bus.$on("dialog.off", () => {
      this.dialog = false;
    });
  }
};
</script>
