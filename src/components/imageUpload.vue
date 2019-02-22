<template>
  <v-container fluid>
    <v-flex
      xs12
      class="text-xs-center text-sm-center text-md-center text-lg-center"
    >
      <v-img :src="imageUrl" class="grey lighten-2" max-height="300" contain />

      <v-btn
        :loading="uploading"
        :disabled="uploading || disabled"
        color="blue-grey"
        class="white--text"
        @click="pickFile"
      >
        อัปโหลดรูปที่เห็นหน้าน้องๆชัดเจน
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>

      <input
        ref="image"
        type="file"
        style="display: none"
        accept="image/*"
        @change="onFilePicked"
      />
    </v-flex>
  </v-container>
</template>

<script>
import bus from "./../core/bus";
import firebase from "./../core/firebase";

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    uploading: false,
    imageUrl: "",
    imageFile: ""
  }),
  mounted() {
    bus.$on("user", () => {
      var filePath = firebase.auth().currentUser.uid + "/pic";
      var imgRef = firebase.storage().ref(filePath);
      imgRef
        .getDownloadURL()
        .then(url => {
          this.imageUrl = url;
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              break;
            default:
              console.error(error);
          }
        });
    });
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
        this.imageFile = "";
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
          "ดูเหมือนภาพของน้องๆจะใหญ่เกินไป โปรดลองภาพที่มีขนาดเล็กกว่านี้นะครับ ขนาดสูงสุดที่อนุญาตคือ 5MB"
        );
        return;
      }

      var filePath = firebase.auth().currentUser.uid + "/pic";
      var imgRef = firebase.storage().ref(filePath);
      imgRef.put(file).then(fileSnapshot => {
        return fileSnapshot.ref.getDownloadURL().then(url => {
          this.imageUrl = url;
          this.uploading = false;
        });
      });
    }
  }
};
</script>
