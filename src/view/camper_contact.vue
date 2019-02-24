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
    form: {
      phone: null,
      email: null,
      fb: null,
      line: null,
      talent: null
    },
    rules: {
      required: value => !!value || "คำถามที่ต้องการคำตอบ",
      phone: value => {
        if (value === null) return;
        return value.charAt(0) === "0" || "รูปแบบไม่ถูกต้อง";
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "รูปแบบไม่ถูกต้อง";
      }
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
