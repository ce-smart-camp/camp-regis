<template>
  <v-card-text>
    <div class="my-3">
      <p>
        11. สมมติว่าถ้าน้องอยู่ในกลุ่มที่มีเพื่อน 4 คน เป็นนักกีฬาโรงเรียน 1 คน
        เป็นดาวโรงเรียน 1 คน เป็นนักเรียนเรียนดี 1 คน
        และตัวน้องเองเป็นคนธรรมดาไม่มีอะไรโดดเด่น
        น้องจะรู้สึกอย่างไรและมีวิธีปฏิบัติตนอย่างไรในกลุ่มเพื่อน
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
        12. มีวัตถุดิบ 10อย่าง โดยวัตถุดิบทุกอย่างสามารถนำไปนึ่ง ลวก ย่าง
        หรือทอด กระบวนการใดกระบบวนการหนึ่ง ก่อนนำไปปรุงด้วยสูตรลับเฉพาะ
        หากเลือกวัตถุดิบมา 3อย่าง จะมีวิธีทำอาหารกี่วิธีจงแสดงวิธีทำ
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
        13. ถ้าน้องติดเกาะอยู่กลางทะเล น้องสามารถเสกของได้ 1อย่าง
        น้องจะเลือกอะไร
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
        14. มีอะไรจะถามพี่ไหม
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
        15. EXTRA เลือกทำ 1ข้อ(หากทำมากกว่า 1
        ข้อจะคิดคะแนนข้อที่ได้น้อยที่สุด)<br />
        <br />
        A) จงเขียนอะไรก็ได้ที่คิดว่าพี่อ่านแล้วจะหัวเราะ<br />
        B) ไทยแลนด์4.0 อัตราส่วนทองคำ ทฎษฎีสัมพันธ์ภาพพิเศษ DNA IOT ก็มาดิครับ
        ปัดทุ่มด้วยโพเดียม หมีหยก BNK48 PM2.5 (ให้คำมา 10คำ
        ที่ไม่เกี่ยวกันเลยให้น้องสร้างเรื่องราวจากคำพวกนั้น)<br />
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
