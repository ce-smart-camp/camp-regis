<template>
  <v-card-text>
    <v-textarea label="โรคประจำตัว" auto-grow rows="3" v-model="form.disease"></v-textarea>
    <v-textarea label="ยาที่แพ้" auto-grow rows="3" v-model="form.drug"></v-textarea>
    <v-textarea label="อาหารที่แพ้" auto-grow rows="3" v-model="form.food"></v-textarea>
  </v-card-text>
</template>

<script>
export default {
  props: ["value"],
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
        this.form = val;
      },
      deep: true
    }
  },
  mounted: function() {
    Object.keys(this.form).forEach(key => {
      this.form[key] = this.value[key] || null;
    });
  }
};
</script>