<template>
  <v-card-text>
    <v-text-field
      v-model="form.phone"
      label="หมายเลขโทรศัพท์เคลื่อนที่"
      browser-autocomplete="tel"
      mask="## #### ####"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.email"
      label="จดหมายอิเล็กทรอนิกส์"
      browser-autocomplete="email"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.fb"
      label="Facebook"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.line"
      label="Line ID"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
      :disabled="disable"
    />
    <v-textarea
      v-model="form.talent"
      label="ความสามารถพิเศษ"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      auto-grow
      rows="3"
      clearable
      :disabled="disable"
    />
    <v-select
      v-model="form.shirt"
      :items="option.shirtSize"
      label="ขนาดเสื้อ"
      clearable
      :disabled="disable"
    />
  </v-card-text>
</template>

<script>
import bus from "./../core/bus";
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
    disable: false,
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

    bus.$on("reg.close", () => (this.disable = true));
  }
};
</script>
