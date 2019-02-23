<template>
  <v-card-text>
    <div class="my-3">
      <p>
        10. IoT(Internet of Things) ที่เริ่มได้ยินกันติดหูกันในปัจจุบันนั้นก็คือ
        การที่อุปกรณ์อิเล็กทรอนิกส์อะไรก็ตามนั้นสามารถเชื่อมโยงสู่โลกอินเตอร์เน็ตได้
        และแนวโน้มที่กำลังจะมาแรงเกี่ยวกับ IoT ในอนาคตอันใกล้นี้ก็คือ “Smart
        Home” พี่ๆจึงอยากให้น้องๆคิดโปรเจคขึ้นมาโปรเจคนึงที่เกี่ยวกับ “Smart
        Home” โดยโปรเจคนั้นจะต้องสามารถทำได้จริง
        อธิบายรายละเอียดเกี่ยวกับโปรเจคนั้นคร่าวๆ และตอบคำถามเหล่านี้ได้
      </p>
    </div>
    <v-textarea
      v-model="form.item1"
      auto-grow
      rows="3"
      label="อธิบายรายละเอียดเกี่ยวกับโปรเจค"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item2"
      auto-grow
      rows="3"
      label="ทำไมน้องๆถึงเลือกทำโปรเจคนี้ขึ้นมา"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item3"
      auto-grow
      rows="3"
      label="ของที่ใช้ในการทำโปรเจคมีอะไรบ้าง"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item4"
      auto-grow
      rows="3"
      label="โปรเจคที่คิดออกมาใครสามารถนำไปใช้ได้บ้าง อย่างไร"
      box
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <v-textarea
      v-model="form.item5"
      auto-grow
      rows="3"
      label="สามารถนำไปต่อยอดได้อย่าง"
      box
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
      item1: null,
      item2: null,
      item3: null,
      item4: null,
      item5: null
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

    bus.$on("qus.close", () => (this.disable = true));
  }
};
</script>
