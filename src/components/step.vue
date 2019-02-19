<template>
  <v-card class="mx-auto" max-width="600px">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="34"
        v-text="step"
      />
    </v-card-title>

    <v-window v-model="step" :touch="slide">
      <v-window-item v-for="index in 9" :key="index" :value="index">
        <Welcome v-if="index === 1" />
        <CamperInfo v-if="index === 2" v-model="form.info" />
        <CamperContact v-if="index === 3" v-model="form.contact" />
        <CamperHealth v-if="index === 4" v-model="form.health" />
        <CamperAddress v-if="index === 5" v-model="form.address" />
        <CamperEdu v-if="index === 6" v-model="form.edu" />
        <CamperParent v-if="index === 7" v-model="form.parent" />
        <CamperPass v-if="index === 8" v-model="form.pass" />
        <End v-if="index === 9" />
      </v-window-item>
    </v-window>

    <v-divider />

    <v-card-actions>
      <v-btn :disabled="step === 1 || dialog" flat @click="backPage">
        <v-icon>keyboard_arrow_left</v-icon>&nbsp;ย้อนกลับ&nbsp;&nbsp;
      </v-btn>
      <v-spacer />
      <v-btn
        :disabled="step === 9 || dialog"
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
          {{ dialog_msg }}
          <v-progress-linear indeterminate color="white" class="mb-0" />
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

import deepCompare from "./../util/deepCompare";

import Welcome from "./../view/welcome";
import CamperInfo from "./../view/camper_info";
import CamperContact from "./../view/camper_contact";
import CamperHealth from "./../view/camper_health";
import CamperAddress from "./../view/camper_address";
import CamperEdu from "./../view/camper_edu";
import CamperParent from "./../view/camper_parent";
import CamperPass from "./../view/camper_pass";
import End from "./../view/end";

function copyObject(obj) {
  if (obj === null) return null;

  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") newObj[key] = copyObject(obj[key]);
    else {
      if (obj[key] === "") obj[key] = null;
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
        if (obj[key] === "-") obj[key] = null;
      }
      newObj[key] = obj[key];
    }
  });
  return newObj;
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

    if (data.created_at === "new-data") {
      newData.created_at = firebase.firestore.FieldValue.serverTimestamp();
    } else {
      if (oldData.created_at) delete oldData.created_at;
      delete newData.created_at;
    }

    if (oldData.update_at) delete oldData.update_at;
    delete newData.update_at;

    if (!deepCompare(newData, oldData)) {
      newData.update_at = firebase.firestore.FieldValue.serverTimestamp();

      regisRef
        .set(newData, { merge: true })
        .then(function() {
          // console.log("Document successfully written!", newData);
          oldData = newData;
          data.created_at = "save-data";
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
          console.log(doc.create_time);
          let data = doc.data();
          // console.log("Document data:", data);
          oldData = copyObject(data);
          resolve(data);
        } else {
          // console.log("No such document!");
          resolve(null);
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
        reject(error);
      });
  });
}

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
    End
  },
  data: () => ({
    step: 1,
    dialog: true,
    dialog_msg: "กำลังเตรียมพร้อม",
    slide: {
      left() {
        bus.$emit("step-next");
      },
      right() {
        bus.$emit("step-back");
      }
    },
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
  mounted() {
    if (firebase.auth().currentUser) this.dialog = false;

    bus.$on("signin", () => {
      this.dialog_msg = "กำลังลงชื่อเข้าใช้";
      this.dialog = true;
    });

    bus.$on("user", () => {
      this.dialog_msg = "กำลังโหลดข้อมูล";
      this.dialog = true;

      setUpRegisRef();

      getData().then(data => {
        if (data !== null) this.form = data;
        else {
          this.form.created_at = "new-data";
          this.form.fb_id = firebase.auth().currentUser.providerData[0].uid;
        }

        this.dialog = false;

        bus.$emit("loaded", data);
      });
    });

    bus.$on("step-next", () => {
      this.nextPage();
    });

    bus.$on("step-back", () => {
      this.backPage();
    });
  },
  methods: {
    nextPage() {
      if (this.step < 9) {
        this.dialog_msg = "กำลังบันทึกข้อมูล";
        this.dialog = true;
        updateDate(this.form).then(() => {
          this.step++;
          this.dialog = false;
        });
      }
    },
    backPage() {
      if (this.step > 1) {
        this.dialog_msg = "กำลังบันทึกข้อมูล";
        this.dialog = true;
        updateDate(this.form).then(() => {
          this.step--;
          this.dialog = false;
        });
      }
    }
  }
};
</script>
