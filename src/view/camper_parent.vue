<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm6 xs12>
        <v-text-field
          v-model="form.name"
          label="ชื่อ"
          hint="ไม่ต้องใส่คำนำหน้า"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.prefix, rules.thai]"
        />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field
          v-model="form.surname"
          label="นามสกุล"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.thai]"
        />
      </v-flex>

      <v-flex sm6 xs12>
        <v-combobox
          v-model="form.relation"
          label="ความเกี่ยวข้อง"
          :items="itemsRelation"
          :clearable="!disable && !readonly"
          auto-select-first
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm6 xs12>
        <v-text-field
          v-model="form.tel"
          label="หมายเลขโทรศัพท์"
          mask="## #### ####"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.phone]"
        />
      </v-flex>
    </v-layout>
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
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    disable: false,
    itemsRelation: [
      "บิดา",
      "คุณพ่อ",
      "มารดา",
      "คุณแม่",
      "พี่",
      "พี่ชาย",
      "พี่สาว",
      "คุณปู่",
      "คุณย่า",
      "คุณตา",
      "คุณยาย",
      "คุณลุง",
      "คุณป้า",
      "คุณน้า",
      "คุณอา"
    ],
    form: {
      name: null,
      surname: null,
      relation: null,
      tel: null
    },
    rules: {
      required: value => !!value || "คำถามที่ต้องการคำตอบ",
      phone: value => {
        if (value === null) return true;
        return value.charAt(0) === "0" || "รูปแบบไม่ถูกต้อง";
      },
      prefix: val =>
        !/^(นาย|นาง(สาว)?|น\.?ส\.?|ด\.?(ญ|ช)\.?) ?/.test(val) ||
        "ก็บอกว่าไม่ต้องใส่คำนำหน้าไง",
      thai: val =>
        /^([\u0E00-\u0E7F ])+$/.test(val) || "สามารถกรอกได้แค่ภาษาไทย"
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
