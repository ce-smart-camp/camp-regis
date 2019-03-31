<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm6>
        <v-text-field
          v-model="form.phone"
          label="หมายเลขโทรศัพท์"
          browser-autocomplete="tel"
          mask="## #### ####"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.phone]"
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field
          v-model="form.email"
          label="จดหมายอิเล็กทรอนิกส์"
          browser-autocomplete="email"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required, rules.email]"
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field
          v-model="form.fb"
          label="Facebook"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field
          v-model="form.line"
          label="Line ID"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex xs12>
        <v-textarea
          v-model="form.talent"
          label="ความสามารถพิเศษ"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          rows="3"
          :readonly="readonly"
          :disabled="disable && !readonly"
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
      phone: null,
      email: null,
      fb: null,
      line: null,
      talent: null
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
