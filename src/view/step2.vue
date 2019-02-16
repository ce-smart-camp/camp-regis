<template>
  <v-card-text>
    <v-text-field
      v-model="form.phone"
      label="หมายเลขโทรศัพท์เคลื่อนที่"
      browser-autocomplete="tel"
      mask="## #### ####"
      clearable
    />
    <v-text-field
      v-model="form.email"
      label="จดหมายอิเล็กทรอนิกส์"
      browser-autocomplete="email"
      clearable
    />
    <v-text-field v-model="form.fb" label="Facebook" clearable />
    <v-text-field
      v-model="form.line"
      label="Line ID"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-textarea
      v-model="form.talent"
      label="ความสามารถพิเศษ"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      auto-grow
      rows="3"
      clearable
    />
    <v-select
      v-model="form.shirt"
      :items="option.shirtSize"
      label="ขนาดเสื้อ"
      clearable
    />
  </v-card-text>
</template>

<script>
import bus from "./../core/bus";
import firebase from "./../core/firebase";
const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

const shirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL"
};

const shirtSizeOptions = Options(shirtSizes);

export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  data: () => ({
    option: {
      shirtSize: shirtSizeOptions
    },
    form: {
      phone: null,
      email: null,
      fb: null,
      line: null,
      talent: null,
      shirt: null
    }
  }),
  watch: {
    form: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    },
    value: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  mounted: function() {
    if (this.value !== null) {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.value[key] || null;
      });
    }
    this.$emit("input", this.form);

    bus.$on("loaded", data => {
      if (data == null) data = {};
      if (data.contact == null) data.contact = {};

      this.form.fb =
        data.contact.fb ||
        firebase.auth().currentUser.providerData[0].displayName;
      this.form.email =
        data.contact.email || firebase.auth().currentUser.providerData[0].email;
      this.form.phone =
        data.contact.phone ||
        firebase.auth().currentUser.providerData[0].phoneNumber;
    });
  }
};
</script>
