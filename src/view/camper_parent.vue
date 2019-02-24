<template>
  <v-card-text>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          v-model="form.name"
          label="ชื่อ"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex xs6>
        <v-text-field
          v-model="form.surname"
          label="นามสกุล"
          :clearable="!disable && !readonly"
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex xs6>
        <v-combobox
          v-model="form.relation"
          label="ความเกี่ยวข้อง"
          :items="itemsRelation"
          :clearable="!disable && !readonly"
          auto-select-first
          :readonly="readonly"
          :disabled="disable && !readonly"
        />
      </v-flex>

      <v-flex xs6>
        <v-text-field
          v-model="form.tel"
          label="หมายเลขโทรศัพท์"
          mask="## #### ####"
          :clearable="!disable && !readonly"
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
