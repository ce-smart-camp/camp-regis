<template>
  <div class="text-xs-center">
    <v-img :src="imageUrl" max-height="300" contain />

    <v-btn
      v-if="!readonly"
      :loading="uploading"
      :disabled="uploading || disabled"
      color="blue"
      class="white--text"
      @click="pickFile"
    >
      {{ text }}
      <v-icon right dark>cloud_upload</v-icon>
      <template v-slot:loader>
        <span>กำลังอัปโหลด {{ progress }}%</span>
      </template>
    </v-btn>

    <v-alert
      :value="readonly && (imageUrl === '' || imgMD5 === '')"
      type="warning"
    >
      น้องๆไม่ได้อัปโหลดรูปภาพ
    </v-alert>

    <input
      ref="image"
      type="file"
      style="display: none"
      accept="image/*"
      @change="onFilePicked"
    />
  </div>
</template>

<script>
import bus from "./../core/bus";
import firebase from "./../core/firebase";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "อัปโหลด"
    },
    filename: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    uploading: false,
    imageUrl: "",
    fileRef: null,
    imgMD5: "",
    progress: ""
  }),
  watch: {
    imgMD5(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.imgMD5 = val;
      if (val !== "") this.loadImg();
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(event) {
      event.preventDefault();
      const file = event.target.files[0];

      this.uploading = true;

      if (file === undefined) {
        this.uploading = false;
        this.imageUrl = "";
        return;
      }

      if (!file.type.match("image.*")) {
        bus.$emit("dialog.on", "น้องๆสามารถอัปโหลดได้แค่ไฟล์รูปภาพนะครับ");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        bus.$emit(
          "dialog.on",
          "ดูเหมือนภาพของน้องๆจะใหญ่เกินไป ลองใช้ภาพที่มีขนาดเล็กกว่านี้ดูนะครับ ขนาดสูงสุดที่อนุญาตคือ 5MB"
        );
        return;
      }

      this.setupFileRef();

      bus.$emit("loader.change", true);

      var uploadTask = this.fileRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          this.progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);
        },
        error => {
          bus.$emit("loader.change", false);
          bus.$emit("dialog.on", "พี่ๆขออภัยด้วย ระบบเกิดข้อผิดพลาด  " + error);
          throw error;
        },
        () => {
          bus.$emit("loader.change", false);
          this.fileRef = uploadTask.snapshot.ref;
          this.loadImg();
          this.fileRef.getMetadata().then(metadata => {
            this.imgMD5 = metadata.md5Hash;
          });
        }
      );
    },

    loadImg() {
      this.setupFileRef();

      this.fileRef
        .getDownloadURL()
        .then(url => {
          this.imageUrl = url;
          this.uploading = false;
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              break;
            default:
              throw error;
          }
        });
    },

    setupFileRef() {
      if (this.fileRef === null) {
        var filePath = firebase.auth().currentUser.uid + "/" + this.filename;
        this.fileRef = firebase.storage().ref(filePath);
      }
    }
  }
};
</script>
