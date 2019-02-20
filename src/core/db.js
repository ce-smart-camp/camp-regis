import firebase from "./firebase";
import "firebase/firestore";

var db = firebase.firestore();
export default db;

import bus from "./bus";
import deepCompare from "./../util/deepCompare";
import copyObject from "./../util/copyObject";

let oldData = {};
let regisRef = null;

function setUpRegisRef() {
  if (regisRef === null)
    regisRef = db
      .collection("registration")
      .doc(firebase.auth().currentUser.uid);
}

function updateDate(data) {
  bus.$emit("dialog.on", "กำลังบันทึกข้อมูล");

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
          bus.$emit("dialog.off");
          resolve(true);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          bus.$emit("dialog.on", "มีข้อผิดพลาดในการบันทึกข้อมูล");
          reject(Error(error));
        });
    } else {
      bus.$emit("dialog.off");
      resolve(true);
    }
  });
}

function getData() {
  bus.$emit("dialog.on", "กำลังโหลดข้อมูล");

  setUpRegisRef();

  return new Promise(function(resolve, reject) {
    regisRef
      .get()
      .then(function(doc) {
        bus.$emit("dialog.off");

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
        bus.$emit("dialog.on", "พบข้อผิดพลาดในในการโหลดข้อมูล");
        reject(error);
      });
  });
}

export { getData, updateDate };
