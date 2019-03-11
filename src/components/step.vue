<template>
  <v-card class="mx-auto" max-width="1000px">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary"
        class="subheading white--text"
        size="34"
        v-text="step"
      />
    </v-card-title>

    <Form />

    <v-divider />

    <v-card-actions>
      <v-btn
        :disabled="step === 1 || dialog || !isLogin"
        flat
        @click="backPage"
      >
        <v-icon>keyboard_arrow_left</v-icon>&nbsp;ย้อนกลับ&nbsp;&nbsp;
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="step === 13 || dialog || !isLogin"
        color="primary"
        depressed
        @click="nextPage"
        >&nbsp;&nbsp;ต่อไป&nbsp;
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import "./../core/auth";
import bus from "./../core/bus";

import Form from "./form";

export default {
  components: {
    Form
  },
  data: () => ({
    step: 1,
    dialog: false,
    isLogin: false
  }),
  computed: {
    currentTitle() {
      let title = [
        "ยินดีต้อนรับ",
        "ข้อมูลเบื้องต้น",
        "การติดต่อ",
        "ข้อมูลสุขภาพ",
        "ที่อยู่",
        "การศึกษา",
        "ผู้ปกครอง",
        "ประวัติการเข้าค่าย",
        "คำถาม Part 2/1",
        "คำถาม Part 2/2",
        "คำถาม Part 2/3",
        "คำถาม Part 2/4",
        "บันทึกผล"
      ];
      return title[this.step - 1];
    }
  },
  mounted() {
    bus.$on("user.change", val => (this.isLogin = val));
    bus.$on("loader.change", val => (this.dialog = val));

    bus.$on("step.change", val => {
      this.step = val;

      if (typeof window.analytics !== "undefined") {
        window.analytics.page(this.step, {
          title: this.currentTitle,
          path: `/${this.step}`
        });
      }
    });
  },
  methods: {
    nextPage() {
      bus.$emit("step.go", 1);
    },
    backPage() {
      bus.$emit("step.go", -1);
    }
  }
};
</script>
