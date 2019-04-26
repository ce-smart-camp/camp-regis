<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex sm3>
        <v-text-field
          v-model="form.number"
          label="บ้านเลขที่"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm3>
        <v-text-field
          v-model="form.moo"
          label="หมู่ที่"
          mask="##"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm6>
        <v-text-field
          v-model="form.alley"
          label="ตรอก / ซอย"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.village"
          label="หมู่บ้าน"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.road"
          label="ถนน"
          hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.subdistrict"
          label="ตำบล / แขวง"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.district"
          label="อำเภอ / เขต"
          browser-autocomplete="address-level2"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.province"
          label="จังหวัด"
          browser-autocomplete="address-level1"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
          :rules="[rules.required]"
        />
      </v-flex>

      <v-flex sm4>
        <v-text-field
          v-model="form.pcode"
          label="รหัสไปรษณีย์"
          browser-autocomplete="postal-code"
          mask="#####"
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
      number: null,
      moo: null,
      alley: null,
      village: null,
      road: null,
      subdistrict: null,
      district: null,
      province: null,
      pcode: null
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
