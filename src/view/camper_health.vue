<template>
  <v-card-text>
    <v-textarea
      v-model="form.disease"
      label="โรคประจำตัว"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      rows="3"
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.drug"
      label="ยาที่แพ้"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      rows="3"
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.food"
      label="อาหารที่แพ้"
      hint="ถ้าหากไม่มีไม่จำเป็นต้องกรอก"
      rows="3"
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
  </v-card-text>
</template>

<script>
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
      disease: null,
      drug: null,
      food: null
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
