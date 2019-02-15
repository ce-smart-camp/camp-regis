<template>
  <v-card-text>
    <v-text-field label="ชื่อ" v-model="form.name"></v-text-field>
    <v-text-field label="นามสกุล" v-model="form.surname"></v-text-field>
    <v-text-field label="ความเกี่ยวข้อง" v-model="form.relation"></v-text-field>
    <v-text-field label="หมายเลขโทรศัพท์" v-model="form.tel"></v-text-field>
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