<template>
  <v-card-text>
    <v-text-field v-model="form.name" label="ชื่อ" clearable />
    <v-text-field v-model="form.surname" label="นามสกุล" clearable />
    <v-text-field v-model="form.relation" label="ความเกี่ยวข้อง" clearable />
    <v-text-field v-model="form.tel" label="หมายเลขโทรศัพท์" clearable />
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
    }
  },
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
