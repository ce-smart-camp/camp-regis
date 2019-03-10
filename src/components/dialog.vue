<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        แจ้งถึงน้องๆ
      </v-card-title>

      <v-card-text>
        {{ msg }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn flat="flat" @click="dialog = false">
          ปิด
        </v-btn>

        <v-btn v-if="confirm" color="warning" @click="clickConfirm">
          ตกลง
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
    confirm: false,
    msg: "",
    callback: false
  }),
  mounted() {
    bus.$on("dialog.on", input => {
      if (typeof input === "string") {
        this.msg = input;
        this.confirm = false;
        this.callback = false;
      } else {
        this.msg = input.msg;
        this.confirm = input.confirm || false;
        this.callback = input.callback || false;
      }

      this.dialog = true;
    });
  },
  methods: {
    clickConfirm: function() {
      this.dialog = false;
      if (this.callback !== false) {
        this.callback();
      }
    }
  }
};
</script>
