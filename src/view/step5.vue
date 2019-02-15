<template>
  <v-card-text>
    <v-text-field label="โรงเรียน" v-model="form.school"></v-text-field>
    <v-text-field label="จังหวัด" v-model="form.province"></v-text-field>
    <v-text-field label="ระดับชั้น" v-model="form.class"></v-text-field>
    <v-text-field label="แผนการศึกษา" v-model="form.plan"></v-text-field>
    <v-text-field label="เกรดเฉลี่ย" v-model="form.gpax"></v-text-field>
  </v-card-text>
</template>

<script>
const grades = {
  m3: "มัธยมศึกษาปีที่ 3",
  m4: "มัธยมศึกษาปีที่ 4",
  m5: "มัธยมศึกษาปีที่ 5",
  m6: "มัธยมศึกษาปีที่ 6",
  p1: "ปวช.",
  other: "อื่นๆ"
};

export default {
  props: ["value"],
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
    Object.keys(this.form).forEach(key => {
      this.form[key] = this.value[key] || null;
    });
  }
};
</script>