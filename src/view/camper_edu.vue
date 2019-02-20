<template>
  <v-card-text>
    <v-text-field v-model="form.school" label="โรงเรียน" clearable />
    <v-text-field v-model="form.province" label="จังหวัด" clearable />
    <v-combobox
      v-model="classRaw"
      label="ระดับชั้น (ปีการศึกษา 2561)"
      :items="gradesOptions"
      clearable
      auto-select-first
    />
    <v-text-field v-model="form.plan" label="แผนการศึกษา" clearable />
    <v-text-field
      v-model="form.gpax"
      label="เกรดเฉลี่ย"
      mask="#.##"
      return-masked-value
      clearable
    />
  </v-card-text>
</template>

<script>
const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

const grades = {
  m4: "มัธยมศึกษาปีที่ 4",
  m5: "มัธยมศึกษาปีที่ 5",
  m6: "มัธยมศึกษาปีที่ 6",
  p1: "ปวช.1",
  p2: "ปวช.2",
  p3: "ปวช.3"
};

const gradesOptions = Options(grades);

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
    gradesOptions,
    classRaw: null,
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
    },
    "form.class"(val) {
      if (typeof grades[val] !== "undefined") {
        if (this.classRaw === null) this.classRaw = {};
        this.classRaw.value = val;
        this.classRaw.text = grades[val];
      } else {
        if (val != this.classRaw) this.classRaw = val;
      }
    },
    classRaw(val) {
      if (typeof val !== "undefined") {
        if (typeof val === "object" && val !== null) {
          this.form.class = val.value;
        } else this.form.class = val;
      } else this.form.class = null;
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
