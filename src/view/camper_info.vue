<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex xs12>
        <ImgUp
          v-model="form.pic"
          :disabled="disable"
          :readonly="readonly"
          text="อัปโหลดรูปที่เห็นหน้าน้องๆชัดเจน"
          filename="pic_profile"
          required
        />
      </v-flex>

      <v-flex md3 sm4 xs12>
        <v-text-field
          v-model="form.nid"
          label="เลขประจำตัวประชาชนไทย"
          mask="#-####-#####-##-#"
          :rules="[rules.required, rules.national_id]"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex md3 sm4 xs12>
        <v-text-field
          v-model="form.name"
          label="ชื่อ"
          browser-autocomplete="given-name"
          hint="ไม่ต้องใส่คำนำหน้า"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.prefix, rules.thai]"
        />
      </v-flex>

      <v-flex md4 sm4 xs12>
        <v-text-field
          v-model="form.surname"
          label="นามสกุล"
          browser-autocomplete="family-name"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.thai]"
        />
      </v-flex>

      <v-flex md2 sm4 xs12>
        <v-text-field
          v-model="form.nickname"
          label="ชื่อเล่น"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.thai]"
        />
      </v-flex>

      <v-flex md3 sm4>
        <v-select
          v-model="form.gender"
          :items="option.gender"
          label="เพศ"
          prepend-icon="wc"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex md3 sm4>
        <v-text-field
          v-model="form.birth"
          label="วันเกิด"
          prepend-icon="cake"
          mask="##/##/####"
          hint="กดที่ปฏิทินเพื่อเลือกวันได้"
          placeholder="30/03/2562"
          return-masked-value
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.date]"
          @blur="date = parseDate(form.birth)"
          @click:clear="date = parseDate(form.birth)"
        >
          <v-menu
            ref="menu"
            slot="append"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-left="290"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
            :disabled="disable || readonly"
          >
            <v-icon slot="activator">event</v-icon>
            <v-date-picker
              ref="picker"
              v-model="date"
              scrollable
              locale="th-th"
              :max="new Date().toISOString().substr(0, 10)"
              min="1995-01-01"
            />
          </v-menu>
        </v-text-field>
      </v-flex>

      <v-flex md3 sm6>
        <v-select
          v-model="form.religion"
          :items="option.religion"
          label="ศาสนา"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex md3 sm6>
        <v-select
          v-model="form.shirt"
          :items="option.shirtSize"
          label="ขนาดเสื้อ"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
import rules from "./../core/rules";
import ImgUp from "./../components/imageUpload";

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
  man: "ชาย",
  female: "หญิง",
  other: "เพศอื่นๆ",
  unspecified: "ไม่ระบุ"
};

const shirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL"
};

const religionOptions = Options(religions);
const genderOptions = Options(genders);
const shirtSizeOptions = Options(shirtSizes);

export default {
  components: {
    ImgUp
  },
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
    option: {
      gender: genderOptions,
      religion: religionOptions,
      shirtSize: shirtSizeOptions
    },
    date: null,
    menu: false,
    form: {
      pic: "",
      nid: null,
      name: null,
      surname: null,
      nickname: null,
      gender: null,
      birth: null,
      religion: null,
      shirt: null
    },
    rules
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
        Object.keys(val).forEach(key => {
          if (typeof val[key] === "undefined") val[key] = null;
        });
      },
      deep: true
    },
    value: {
      handler(val) {
        this.copy2form(val);
      },
      deep: true
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
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${Number(year) + 543}`;
    },
    parseDate(date) {
      if (!date) return null;

      const array = date.split("/");
      if (array.length !== 3) return null;

      const [day, month, year] = array;
      return `${year - 543}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
