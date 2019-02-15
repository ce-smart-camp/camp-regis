<template>
  <v-card-text>
    <v-text-field label="หมายเลขโทรศัพท์เคลื่อนที่" v-model="form.phone" browser-autocomplete="tel"></v-text-field>
    <v-text-field label="จดหมายอิเล็กทรอนิกส์" v-model="form.email" browser-autocomplete="email"></v-text-field>
    <v-text-field label="Facebook" v-model="form.fb"></v-text-field>
    <v-text-field label="Line ID" v-model="form.line"></v-text-field>
    <v-textarea label="ความสามารถพิเศษ" auto-grow rows="3" v-model="form.talent"></v-textarea>
    <v-select :items="option.shirtSize" label="ขนาดเสื้อ" v-model="form.shirt"></v-select>
  </v-card-text>
</template>

<script>
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
  props: ["value"],
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
        this.$emit("input", this.form);
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
    Object.keys(this.form).forEach(key => {
      this.form[key] = this.value[key] || null;
    });
  }
};
</script>