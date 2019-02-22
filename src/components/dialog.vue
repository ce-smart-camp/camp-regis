<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        แจ้งถึงน้องๆๆ
      </v-card-title>

      <v-card-text>
        {{ msg }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn flat="flat" @click="dialog = false">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import bus from "./../core/bus";

export default {
  data: () => ({
    dialog: false,
    msg: ""
  }),
  mounted() {
    bus.$on("dialog.on", msg => {
      this.msg = msg;
      this.dialog = true;
    });
  }
};
</script>
