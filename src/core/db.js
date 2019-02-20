import firebase from "./firebase";
import "firebase/firestore";

var db = firebase.firestore();
export default db;

import bus from "./bus";
import deepCompare from "./../util/deepCompare";
import copyObject from "./../util/copyObject";

let oldData = {};
let regisRef = null;
let questionRef = null;

function setUpRef() {
  if (regisRef === null)
    regisRef = db.collection("reg").doc(firebase.auth().currentUser.uid);
  if (questionRef === null)
    questionRef = db.collection("qus").doc(firebase.auth().currentUser.uid);
}

function updateData(data) {
  bus.$emit("dialog.on", "กำลังบันทึกข้อมูล");

  setUpRef();

  let updateData = copyObject(data);

  if (data.reg.created_at === "new-data") {
    updateData.reg.created_at = firebase.firestore.FieldValue.serverTimestamp();
  } else {
    if (oldData.reg.created_at) delete oldData.reg.created_at;
    delete updateData.reg.created_at;
  }

  let run = (ref, newD, oldD) => {
    return new Promise((resolve, reject) => {
      if (typeof oldD !== "undefined")
        if (oldD.update_at) delete oldD.update_at;
      delete newD.update_at;

      if (!deepCompare(newD, oldD)) {
        newD.update_at = firebase.firestore.FieldValue.serverTimestamp();
        ref
          .set(newD, { merge: true })
          .then(() => resolve(true))
          .catch(error => reject(error));
      } else resolve(true);
    });
  };

  return new Promise(function(resolve, reject) {
    Promise.all([
      run(regisRef, updateData.reg, oldData.reg),
      run(questionRef, updateData.qus, oldData.qus)
    ])
      .then(() => {
        oldData = updateData;
        data.reg.created_at = "save-data";
        bus.$emit("dialog.off");
        resolve(true);
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
        bus.$emit("dialog.on", "มีข้อผิดพลาดในการบันทึกข้อมูล");
        reject(error);
      });
  });
}

function getData() {
  bus.$emit("dialog.on", "กำลังโหลดข้อมูล");

  setUpRef();

  return new Promise(function(resolve, reject) {
    var pRegis = regisRef.get();
    var pQuestion = questionRef.get();

    Promise.all([pRegis, pQuestion])
      .then(doc => {
        let data = {};
        if (doc[0].exists) data.reg = doc[0].data();
        if (doc[1].exists) data.qus = doc[1].data();

        oldData = copyObject(data);

        bus.$emit("dialog.off");
        resolve(data);
      })
      .catch(function(error) {
        console.error("Error getting document:", error);
        bus.$emit("dialog.on", "พบข้อผิดพลาดในในการโหลดข้อมูล");
        reject(error);
      });
  });
}

export { getData, updateData };
