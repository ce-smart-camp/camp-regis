<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item v-for="index in 9" :key="index" :value="index">
        <Welcome v-if="index === 1"/>
        <step1 v-model="form.info" v-if="index === 2"/>
        <step2 v-model="form.contact" v-if="index === 3"/>
        <step3 v-model="form.health" v-if="index === 4"/>
        <step4 v-model="form.address" v-if="index === 5"/>
        <step5 v-model="form.edu" v-if="index === 6"/>
        <step6 v-model="form.parent" v-if="index === 7"/>
        <step7 v-model="form.pass" v-if="index === 8"/>
        <End v-if="index === 9"/>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" flat @click="backPage">
        <v-icon>keyboard_arrow_left</v-icon>&nbsp;ย้อนกลับ&nbsp;&nbsp;
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 9"
        color="primary"
        depressed
        @click="nextPage"
      >&nbsp;&nbsp;ต่อไป&nbsp;
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{dialog_msg}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import firebase from "./../core/firebase";
import "./../core/auth";
import db from "./../core/db";
import bus from "./../core/bus";

import Welcome from "./../view/welcome";
import Step1 from "./../view/step1";
import Step2 from "./../view/step2";
import Step3 from "./../view/step3";
import Step4 from "./../view/step4";
import Step5 from "./../view/step5";
import Step6 from "./../view/step6";
import Step7 from "./../view/step7";
import End from "./../view/end";

function copyObject(obj) {
  if (obj === null) return null;

  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") newObj[key] = copyObject(obj[key]);
    else newObj[key] = obj[key];
  });
  return newObj;
}

function compObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

let oldData = {};
let regisRef = null;

function setUpRegisRef() {
  regisRef = db.collection("registration").doc(firebase.auth().currentUser.uid);
}

function updateDate(data) {
  return new Promise(function(resolve, reject) {
    var newData = copyObject(data);

    if (regisRef === null) setUpRegisRef();

    if (newData.created_at === null) {
      newData.created_at = firebase.firestore.FieldValue.serverTimestamp();
      data.created_at = new Date();
    } else {
      if (oldData.created_at) delete oldData.created_at;
      delete newData.created_at;
    }

    if (oldData.update_at) delete oldData.update_at;
    delete newData.update_at;

    if (!compObject(newData, oldData)) {
      newData.update_at = firebase.firestore.FieldValue.serverTimestamp();

      regisRef
        .set(newData, { merge: true })
        .then(function() {
          console.log("Document successfully written!", newData);
          oldData = newData;
          resolve(true);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          reject(Error(error));
        });
    } else resolve(true);
  });
}

function getData() {
  return new Promise(function(resolve, reject) {
    regisRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          console.log("Document data:", data);
          resolve(data);
          oldData = copyObject(data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          resolve(null);
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  });
}

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
    dialog: false,
    dialog_msg: "",
    form: {
      id: null,
      fb_id: null,
      info: null,
      contact: null,
      health: null,
      address: null,
      edu: null,
      parent: null,
      pass: null,
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
  },
  methods: {
    nextPage: function() {
      this.dialog_msg = "กำลังบันทึกข้อมูล";
      this.dialog = true;
      updateDate(this.form).then(() => {
        this.step++;
        this.dialog = false;
      });
    },
    backPage: function() {
      this.dialog_msg = "กำลังบันทึกข้อมูล";
      this.dialog = true;
      updateDate(this.form).then(() => {
        this.step--;
        this.dialog = false;
      });
    }
  },
  mounted() {
    bus.$on("user", () => {
      this.dialog_msg = "กำลังโหลดข้อมูล";
      this.dialog = true;

      setUpRegisRef();

      getData().then(data => {
        if (data !== null) this.form = data;

        this.dialog = false;
      });
    });
  }
};
</script>