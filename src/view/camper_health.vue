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
