<template>
  <v-card-text>
    <v-text-field label="ชื่อ" v-model="form.name" clearable></v-text-field>
    <v-text-field label="นามสกุล" v-model="form.surname" clearable></v-text-field>
    <v-text-field label="ความเกี่ยวข้อง" v-model="form.relation" clearable></v-text-field>
    <v-text-field label="หมายเลขโทรศัพท์" v-model="form.tel" clearable></v-text-field>
  </v-card-text>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    form: {
      name: null,
      surname: null,
      relation: null,
      tel: null
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
  }
};
</script>