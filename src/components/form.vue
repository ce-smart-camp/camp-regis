<template>
  <v-window v-model="step" :touch="slide">
    <v-window-item :value="1">
      <Welcome />
    </v-window-item>

    <v-window-item :value="2">
      <CamperInfo v-model="form.reg.info" />
    </v-window-item>

    <v-window-item :value="3">
      <CamperContact v-model="form.reg.contact" />
    </v-window-item>

    <v-window-item :value="4">
      <CamperHealth v-model="form.reg.health" />
    </v-window-item>

    <v-window-item :value="5">
      <CamperAddress v-model="form.reg.address" />
    </v-window-item>

    <v-window-item :value="6">
      <CamperEdu v-model="form.reg.edu" />
    </v-window-item>

    <v-window-item :value="7">
      <CamperParent v-model="form.reg.parent" />
    </v-window-item>

    <v-window-item :value="8">
      <CamperPass v-model="form.reg.pass" />
    </v-window-item>

    <v-window-item :value="9">
      <AcademicLogic v-model="form.qus.logic" />
    </v-window-item>

    <v-window-item :value="10">
      <AcademicElect v-model="form.qus.elect" />
    </v-window-item>

    <v-window-item :value="11">
      <AcademicPro v-model="form.qus.pro" />
    </v-window-item>

    <v-window-item :value="12">
      <AcademicIot v-model="form.qus.iot" />
    </v-window-item>

    <v-window-item :value="13">
      <End />
    </v-window-item>
  </v-window>
</template>

<script>
import firebase from "./../core/firebase";
import bus from "./../core/bus";
import { getData, updateData } from "./../core/db";

import Welcome from "./../view/welcome";
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";
import AcademicLogic from "./../view/academic_logic";
import AcademicElect from "./../view/academic_elect";
import AcademicPro from "./../view/academic_pro";
import AcademicIot from "./../view/academic_iot";
import End from "./../view/end";

export default {
  components: {
    Welcome,
    CamperInfo,
    CamperContact,
    CamperHealth,
    CamperAddress,
    CamperEdu,
    CamperParent,
    CamperPass,
    AcademicLogic,
    AcademicElect,
    AcademicPro,
    AcademicIot,
    End
  },
  data: () => ({
    step: 1,
    dialog: false,
    form: {
      reg: {
        fb_id: null,
        info: null,
        contact: null,
        health: null,
        address: null,
        edu: null,
        parent: null,
        pass: null,
        created_at: null,
        update_at: null
      },
      qus: {
        logic: null,
        elect: null,
        pro: null,
        iot: null,
        update_at: null,
        completed_at: null
      }
    },
    slide: {
      left() {
        bus.$emit("step.go", 1);
      },
      right() {
        bus.$emit("step.go", -1);
      }
    }
  }),
  watch: {
    step(val) {
      bus.$emit("step.change", val);
    }
  },
  mounted() {
    bus.$on("step.go", next => this.goto(this.step + next));

    bus.$on("step.goto", to => this.goto(to));

    bus.$on("dialog.change", val => {
      this.dialog = val;
    });

    bus.$on("user", () => {
      getData().then(data => {
        if (typeof data.reg !== "undefined") this.form.reg = data.reg;
        else {
          this.form.reg.created_at = "new-data";
          this.form.reg.fb_id = firebase.auth().currentUser.providerData[0].uid;
        }
        if (typeof data.qus !== "undefined") this.form.qus = data.qus;

        bus.$emit("loaded", data);
      });
    });
  },
  methods: {
    goto(val) {
      if (!this.dialog)
        updateData(this.form).then(can => {
          if (can) {
            this.step = val;
            if (this.step < 1) this.step = 1;
            if (this.step > 13) this.step = 13;
          }
        });
    }
  }
};
</script>
