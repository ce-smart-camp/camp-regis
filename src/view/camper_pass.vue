<template>
  <v-card-text>
    <v-text-field
      v-model="form.camp1"
      label="ค่าย"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-text-field
      v-model="form.camp1_uni"
      label="มหาวิทยาลัย / หน่วยงาน"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-text-field
      v-model="form.camp2"
      label="ค่าย"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-text-field
      v-model="form.camp2_uni"
      label="มหาวิทยาลัย / หน่วยงาน"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-text-field
      v-model="form.camp3"
      label="ค่าย"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-text-field
      v-model="form.camp3_uni"
      label="มหาวิทยาลัย / หน่วยงาน"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      clearable
    />
    <v-textarea
      v-model="form.knowFrom"
      label="รู้จักค่ายนี้มาจากไหน"
      auto-grow
      rows="3"
      clearable
    />
  </v-card-text>
</template>

<script>
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
    form: {
      camp1: null,
      camp1_uni: null,
      camp2: null,
      camp2_uni: null,
      camp3: null,
      camp3_uni: null,
      knowFrom: null
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
