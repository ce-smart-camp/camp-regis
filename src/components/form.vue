<template>
  <v-window v-model="step" :touch="slide">
    <v-window-item :value="1">
      <Welcome v-if="step <= 2" />
    </v-window-item>

    <v-window-item :value="2">
      <CamperInfo
        v-if="1 <= step && step <= 3"
        v-model="form.reg.info"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="3">
      <CamperContact
        v-if="2 <= step && step <= 4"
        v-model="form.reg.contact"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="4">
      <CamperHealth
        v-if="3 <= step && step <= 5"
        v-model="form.reg.health"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="5">
      <CamperAddress
        v-if="4 <= step && step <= 6"
        v-model="form.reg.address"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="6">
      <CamperEdu
        v-if="5 <= step && step <= 7"
        v-model="form.reg.edu"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="7">
      <CamperParent
        v-if="6 <= step && step <= 8"
        v-model="form.reg.parent"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="8">
      <CamperPass
        v-if="7 <= step && step <= 9"
        v-model="form.reg.pass"
        :disable="close.reg"
      />
    </v-window-item>

    <v-window-item :value="9">
      <Question1
        v-if="8 <= step && step <= 10"
        v-model="form.qus.q1"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="10">
      <Question2
        v-if="9 <= step && step <= 11"
        v-model="form.qus.q2"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="11">
      <Question3
        v-if="10 <= step && step <= 12"
        v-model="form.qus.q3"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="12">
      <AcademicLogic
        v-if="11 <= step && step <= 13"
        v-model="form.qus.logic"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="13">
      <AcademicElect
        v-if="12 <= step && step <= 14"
        v-model="form.qus.elect"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="14">
      <AcademicPro
        v-if="13 <= step && step <= 15"
        v-model="form.qus.pro"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="15">
      <AcademicIot
        v-if="14 <= step && step <= 16"
        v-model="form.qus.iot"
        :disable="close.qus"
      />
    </v-window-item>

    <v-window-item :value="16">
      <End
        v-if="15 <= step"
        v-model="form"
        :show="step === 16"
        :disable="close.reg && close.qus"
      />
    </v-window-item>
  </v-window>
</template>

<script>
import firebase from "./../core/firebase";
import bus from "./../core/bus";
import { getData, updateData, getOldData } from "./../core/db";

import Welcome from "./../view/welcome";
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";
import Question1 from "./../view/qustion_1";
import Question2 from "./../view/qustion_2";
import Question3 from "./../view/qustion_3";
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
    Question1,
    Question2,
    Question3,
    AcademicLogic,
    AcademicElect,
    AcademicPro,
    AcademicIot,
    End
  },
  data: () => ({
    step: 1,
    dialog: false,
    isLogin: false,
    close: {
      reg: false,
      qus: false
    },
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
        q1: null,
        q2: null,
        q3: null,
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

    bus.$on("loader.change", val => (this.dialog = val));
    bus.$on("user.change", val => {
      this.isLogin = val;
      if (val) {
        getData().then(data => {
          if (typeof data.reg !== "undefined") this.form.reg = data.reg;
          else {
            this.form.reg.created_at = "new-data";
            this.form.reg.fb_id = firebase.auth().currentUser.providerData[0].uid;
            this.form.reg.contact = {};
            this.form.reg.contact.fb = firebase.auth().currentUser.providerData[0].displayName;
            this.form.reg.contact.email = firebase.auth().currentUser.providerData[0].email;
          }
          if (typeof data.qus !== "undefined") {
            this.form.qus = data.qus;

            if (this.form.qus.completed_at != null) {
              bus.$emit(
                "dialog.on",
                "น้องได้ส่งใบสมัครไปแล้ว ไม่สามารถแก้ไขได้ สามารถทำได้แค่มอง"
              );
              bus.$emit("reg.close", false);
              bus.$emit("qus.close", false);
            }
          }
        });
      }
    });

    bus.$on("reg.close", () => {
      this.close.reg = true;
      this.form.reg = getOldData().reg;
    });

    bus.$on("qus.close", () => {
      this.close.qus = true;
      this.form.qus = getOldData().qus;
    });
  },
  methods: {
    goto(val) {
      if (!this.dialog && this.isLogin)
        updateData(this.form).then(can => {
          if (can) {
            this.step = val;
            if (this.step < 1) this.step = 1;
            if (this.step > 16) this.step = 16;
          }
        });
      else if (!this.isLogin) {
        bus.$emit(
          "dialog.on",
          "น้องๆต้องลงชื่อเข้าใช้ก่อน ถึงจะไปยังหน้าอื่นๆได้"
        );
      }
    }
  }
};
</script>

<style>
p {
  font-size: 16px;
}

.v-messages__message {
  line-height: 1.5;
}

.v-input .v-label {
  line-height: 1.4;
}
</style>
