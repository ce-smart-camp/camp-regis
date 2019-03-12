<template>
  <v-card-text>
    <div class="my-3">
      <p>
        6. ถ้าโลกกำลังจะแตกในอีก 1นาที
        น้องๆจะทำอะไรก่อนโลกจะแตก(ไม่เกี่ยวกับครอบครัว) เพราะอะไร
      </p>
    </div>
    <v-textarea
      v-model="form.item1"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        7. ถ้าน้องสามารถเลือกเป็นคนกล้าหาญ หรือเป็นคนมีเมตตา
        ได้อย่างใดอย่างหนึ่งน้องจะเลือกเป็นอะไร เพราะอะไร(แก้เหตุผล กับ
        ความถูกต้อง)
      </p>
    </div>
    <v-textarea
      v-model="form.item2"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        8. ถ้าน้องได้เป็นหัวหน้างานแล้วสั่งงานให้ลูกน้อง
        แต่ลูกน้องไม่สามารถทำงานตามคาดหวังของน้องได้ น้องจะทำอย่างไร
      </p>
    </div>
    <v-textarea
      v-model="form.item3"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        9.ถ้าน้องต้องเลือกจับกลุ่มทำงานกับคน2 คน 3 คนต่อไปนี้ น้องจะเลือกใคร
        เพราะเหตุใด<br />
        <br />
        A. คนที่มนุษยสัมพันธ์แย่ พูดไม่รักษาน้ำใจ เก่งเฉพาะเรื่องที่สนใจ<br />
        B. คนที่ไม่เกรงใจ พูดเสียงดัง บ่นทุกสิ่งที่ไม่พอใจ ไม่มีความรับผิดชอบ<br />
        C. ทำงานเอาหน้า กลับกลอก มีมนุยษ์สัมพันธ์ดี<br />
      </p>
    </div>
    <v-textarea
      v-model="form.item4"
      class="nolabel"
      rows="8"
      box
      single-line
      :readonly="readonly"
      :disabled="disable && !readonly"
    />
    <div class="my-3">
      <p>
        10.ขณะที่น้องเดินชมงานศิลปะที่สร้างโดยวิศวกรคอมพิวเตอร์ชื่อดัง
        น้องเห็นผลงานชิ้นหนึ่ง และหยุดพิจารณาดูภาพนั้นอยู่นาน ผลงานนั้นคือ…?
      </p>
    </div>
    <v-textarea
      v-model="form.item5"
      class="nolabel"
      rows="8"
      box
      single-line
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
