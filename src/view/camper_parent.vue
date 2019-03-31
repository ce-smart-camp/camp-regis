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
import rules from "./../core/rules";

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
    }
  },
  mounted: function() {
    this.copy2form(this.value);
    this.$emit("input", this.form);
  },
  methods: {
    copy2form(val) {
      if (typeof val === "object") {
        Object.keys(this.form).forEach(key => {
          this.form[key] = val[key] || null;
        });
      }
    }
  }
};
</script>
