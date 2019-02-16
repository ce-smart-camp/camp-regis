<template>
  <v-card-text>
    <v-text-field v-model="form.school" label="โรงเรียน" clearable />
    <v-text-field v-model="form.province" label="จังหวัด" clearable />
    <v-text-field v-model="form.class" label="ระดับชั้น" clearable />
    <v-text-field v-model="form.plan" label="แผนการศึกษา" clearable />
    <v-text-field v-model="form.gpax" label="เกรดเฉลี่ย" clearable />
  </v-card-text>
</template>

<script>
// const grades = {
//   m3: "มัธยมศึกษาปีที่ 3",
//   m4: "มัธยมศึกษาปีที่ 4",
//   m5: "มัธยมศึกษาปีที่ 5",
//   m6: "มัธยมศึกษาปีที่ 6",
//   p1: "ปวช.",
//   other: "อื่นๆ"
// };

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
      school: null,
      province: null,
      class: null,
      plan: null,
      gpax: null
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
