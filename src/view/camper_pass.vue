<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm7 xs12>
        <v-text-field
          v-model="form.camp1"
          label="ค่ายที่ 1"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp1_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required_uni(form.camp1)]"
        />
      </v-flex>

      <v-flex sm7 xs12>
        <v-text-field
          v-model="form.camp2"
          label="ค่ายที่ 2"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp2_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required_uni(form.camp2)]"
        />
      </v-flex>

      <v-flex sm7 xs12>
        <v-text-field
          v-model="form.camp3"
          label="ค่ายที่ 3"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm5 xs12>
        <v-text-field
          v-model="form.camp3_uni"
          label="มหาวิทยาลัย / หน่วยงาน"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required_uni(form.camp3)]"
        />
      </v-flex>

      <v-flex xs12>
        <v-textarea
          v-model="form.knowFrom"
          label="รู้จักค่ายนี้มาจากที่ไหน"
          rows="3"
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
    form: {
      camp1: null,
      camp1_uni: null,
      camp2: null,
      camp2_uni: null,
      camp3: null,
      camp3_uni: null,
      knowFrom: null
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
      if (typeof val === "object" && val !== null) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = val[key] || null;
        });
      }
    }
  }
};
</script>
