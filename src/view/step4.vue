<template>
  <v-card-text>
    <v-text-field label="บ้านเลขที่" v-model="form.number" clearable></v-text-field>
    <v-text-field label="หมู่ที่" v-model="form.moo" clearable></v-text-field>
    <v-text-field label="ซอย" v-model="form.alley" clearable></v-text-field>
    <v-text-field label="หมู่บ้าน" v-model="form.village" clearable></v-text-field>
    <v-text-field label="ถนน" v-model="form.road" clearable></v-text-field>
    <v-text-field label="ตำบล" v-model="form.subdistrict" clearable></v-text-field>
    <v-text-field
      label="อำเภอ"
      v-model="form.district"
      browser-autocomplete="address-level2"
      clearable
    ></v-text-field>
    <v-text-field
      label="จังหวัด"
      v-model="form.province"
      browser-autocomplete="address-level1"
      clearable
    ></v-text-field>
    <v-text-field
      label="รหัสไปรษณีย์"
      v-model="form.pcode"
      browser-autocomplete="postal-code"
      clearable
    ></v-text-field>
  </v-card-text>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    form: {
      number: null,
      moo: null,
      alley: null,
      village: null,
      road: null,
      subdistrict: null,
      district: null,
      province: null,
      pcode: null
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
  }
};
</script>