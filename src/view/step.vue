<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <Welcome/>
      </v-window-item>

      <v-window-item :value="2">
        <step1 v-model="form.info"/>
      </v-window-item>

      <v-window-item :value="3">
        <step2 v-model="form.contacts"/>
      </v-window-item>

      <v-window-item :value="4">
        <step3 v-model="form.health"/>
      </v-window-item>

      <v-window-item :value="5">
        <step4 v-model="form.address"/>
      </v-window-item>

      <v-window-item :value="6">
        <step5 v-model="form.edu"/>
      </v-window-item>

      <v-window-item :value="7">
        <step6 v-model="form.parent"/>
      </v-window-item>

      <v-window-item :value="8">
        <step7 v-model="form.pass"/>
      </v-window-item>

      <v-window-item :value="9">
        <End/>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" flat @click="step--">
        <v-icon>keyboard_arrow_left</v-icon>&nbsp;Back&nbsp;&nbsp;
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 9" color="primary" depressed @click="step++">&nbsp;&nbsp;Next&nbsp;
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Welcome from "./welcome";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import End from "./end";

export default {
  components: {
    Welcome,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    End
  },
  data: () => ({
    step: 1,
    form: {
      id: null,
      fb_id: null,
      info: {},
      contacts: {},
      health: {},
      address: {},
      edu: {},
      parent: {},
      pass: {},
      created_at: null,
      update_at: null,
      completed_at: null
    }
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
        "บันทึกผล"
      ];

      return title[this.step - 1];
    }
  }
};
</script>