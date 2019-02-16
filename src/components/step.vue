<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      />
    </v-card-title>

    <v-window v-model="step">
      <v-window-item v-for="index in 9" :key="index" :value="index">
        <Welcome v-if="index === 1" />
        <step1 v-if="index === 2" v-model="form.info" />
        <step2 v-if="index === 3" v-model="form.contact" />
        <step3 v-if="index === 4" v-model="form.health" />
        <step4 v-if="index === 5" v-model="form.address" />
        <step5 v-if="index === 6" v-model="form.edu" />
        <step6 v-if="index === 7" v-model="form.parent" />
        <step7 v-if="index === 8" v-model="form.pass" />
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
    else {
      if (obj[key] === "") obj[key] = null;
      if (typeof obj[key] === "string") obj[key] = obj[key].trim();
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

// thank https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

function deepCompare() {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
}

// function compObject(obj1, obj2) {
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

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

    if (newData.fb_id === null)
      newData.fb_id = firebase.auth().currentUser.providerData[0].uid;

    if (!deepCompare(newData, oldData)) {
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
  return new Promise(function(resolve) {
    regisRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          // console.log("Document data:", data);
          resolve(data);
          oldData = copyObject(data);
        } else {
          // console.log("No such document!");
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
    dialog: true,
    dialog_msg: "กำลังเตรียมพร้อม",
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

        this.dialog = false;

        bus.$emit("loaded", data);
      });
    });
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
  }
};
</script>
