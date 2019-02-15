<template>
  <v-card-text>
    <v-text-field
      label="เลขประจำตัวประชาชนไทย"
      mask="#-####-#####-##-#"
      :rules="[rules.national_id]"
      v-model="form.nid"
    ></v-text-field>
    <v-text-field label="ชื่อ" v-model="form.name" browser-autocomplete="given-name"></v-text-field>
    <v-text-field label="นามสกุล" v-model="form.surname" browser-autocomplete="family-name"></v-text-field>
    <v-text-field label="ชื่อเล่น" v-model="form.nickname"></v-text-field>
    <v-select :items="option.gender" label="เพศ" prepend-icon="wc" v-model="form.gender"></v-select>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="form.birth"
        label="วันเกิด"
        prepend-icon="cake"
        mask="##/##/####"
        hint="รูปแบบ วัน/เดือน/ปี(พ.ศ.)"
        @blur="date = parseDate(form.birth)"
        return-masked-value
        append-icon="event"
      ></v-text-field>
      <v-date-picker
        ref="picker"
        v-model="date"
        scrollable
        locale="th-th"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
      ></v-date-picker>
    </v-menu>
    <v-select :items="option.religion" label="ศาสนา" v-model="form.religion"></v-select>
  </v-card-text>
</template>

<script>
const Options = options =>
  Object.entries(options).map(([value, text]) => ({ value, text }));

const religions = {
  atheist: "ไม่นับถือศาสนา",
  buddhist: "ศาสนาพุทธ",
  christianity: "ศาสนาคริสต์",
  islam: "ศาสนาอิสลาม",
  other: "ศาสนาอื่นๆ"
};

const genders = {
  male: "ชาย",
  female: "หญิง",
  other: "เพศอื่นๆ",
  unspecified: "ไม่ระบุ"
};

const religionOptions = Options(religions);
const genderOptions = Options(genders);

function checkID(id) {
  if (!id) return true;
  if (id.length === 0) return true;
  if (id.length != 13) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(id.charAt(i)) * (13 - i);
  return (11 - (sum % 11)) % 10 === Number(id.charAt(12));
}

export default {
  props: ["value"],
  data: () => ({
    option: {
      gender: genderOptions,
      religion: religionOptions
    },
    date: null,
    menu: false,
    rules: {
      national_id: val => checkID(val) || "เลขที่กรอกไม่ถูกต้อง"
    },
    form: {
      nid: null,
      name: null,
      surname: null,
      nickname: null,
      gender: null,
      birth: null,
      religion: null
    }
  }),
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    date(val) {
      this.form.birth = this.formatDate(val);
    },
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
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${Number(year) + 543}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year - 543}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  mounted: function() {
    Object.keys(this.form).forEach(key => {
      this.form[key] = this.value[key] || null;
    });
  }
};
</script>