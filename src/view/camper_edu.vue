<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm8 xs12>
        <v-text-field
          v-model="form.school"
          label="โรงเรียน"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field
          v-model="form.province"
          label="จังหวัด"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4 xs12>
        <v-combobox
          v-model="classRaw"
          label="ระดับชั้น (กำลังจะขึ้น)"
          :items="gradesOptions"
          :clearable="!disable && !readonly"
          auto-select-first
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field
          v-model="form.plan"
          label="แผนการศึกษา"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4 xs12>
        <v-text-field
          v-model="form.gpax"
          label="เกรดเฉลี่ย"
          mask="#.##"
          return-masked-value
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.gpax]"
        />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
import rules from "./../core/rules";

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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
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
    },
    rules
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
        this.copy2form(val);
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
    this.copy2form(this.value);
    this.$emit("input", this.form);
  },
  methods: {
    copy2form(val) {
      if (typeof val === "object" && val !== null) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = val[key] || null;
        });
      }
    }
  }
};
</script>
