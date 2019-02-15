<template>
  <v-card-text>
    <v-text-field label="ค่าย" v-model="form.camp1"></v-text-field>
    <v-text-field label="มหาวิทยาลัย / หน่วยงาน" v-model="form.camp1_uni"></v-text-field>
    <v-text-field label="ค่าย" v-model="form.camp2"></v-text-field>
    <v-text-field label="มหาวิทยาลัย / หน่วยงาน" v-model="form.camp2_uni"></v-text-field>
    <v-text-field label="ค่าย" v-model="form.camp3"></v-text-field>
    <v-text-field label="มหาวิทยาลัย / หน่วยงาน" v-model="form.camp3_uni"></v-text-field>
    <v-textarea label="รู้จักค่ายนี้มาจากไหน" auto-grow rows="3" v-model="form.knowFrom"></v-textarea>
  </v-card-text>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    form: {
      camp1: null,
      camp1_uni: null,
      camp2: null,
      camp2_uni: null,
      camp3: null,
      camp3_uni: null,
      knowFrom: null
    }
  }),
  watch: {
    form: {
      handler(val) {
        this.$emit("input", this.form);
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