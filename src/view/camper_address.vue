<template>
  <v-card-text>
    <v-text-field
      v-model="form.number"
      label="บ้านเลขที่"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.moo"
      label="หมู่ที่"
      mask="##"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.alley"
      label="ตรอก / ซอย"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.village"
      label="หมู่บ้าน"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.road"
      label="ถนน"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.subdistrict"
      label="ตำบล / แขวง"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.district"
      label="อำเภอ / เขต"
      browser-autocomplete="address-level2"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.province"
      label="จังหวัด"
      browser-autocomplete="address-level1"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.pcode"
      label="รหัสไปรษณีย์"
      browser-autocomplete="postal-code"
      clearable
      :disabled="disable"
    />
  </v-card-text>
</template>

<script>
import bus from "./../core/bus";

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

    bus.$on("reg.close", () => (this.disable = true));
  }
};
</script>
