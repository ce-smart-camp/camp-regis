<template>
  <v-card-text>
    <v-text-field
      v-model="form.name"
      label="ชื่อ"
      clearable
      :disabled="disable"
    />
    <v-text-field
      v-model="form.surname"
      label="นามสกุล"
      clearable
      :disabled="disable"
    />
    <v-combobox
      v-model="form.relation"
      label="ความเกี่ยวข้อง"
      :items="itemsRelation"
      clearable
      auto-select-first
      :disabled="disable"
    />
    <v-text-field
      v-model="form.tel"
      label="หมายเลขโทรศัพท์"
      mask="## #### ####"
      clearable
      :disabled="disable"
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
    }
  },
  data: () => ({
    disable: false,
    itemsRelation: [
      "บิดา",
      "คุณพ่อ",
      "มารดา",
      "คุณแม่",
      "พี่",
      "พี่ชาย",
      "พี่สาว",
      "คุณปู่",
      "คุณย่า",
      "คุณตา",
      "คุณยาย",
      "คุณลุง",
      "คุณป้า",
      "คุณน้า",
      "คุณอา"
    ],
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

    bus.$on("reg.close", () => (this.disable = true));
  }
};
</script>
