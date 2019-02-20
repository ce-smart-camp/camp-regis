<template>
  <v-card-text>
    <div class="my-3">
      <p>
        4.
        น้องๆคิดว่าในค่ายของเราจะใช้อุปกรณ์ทางอิเล็กทรอนิกส์หรือโมดูลอะไรบ้างลองยกตัวอย่างมาให้มากที่สุด
      </p>
    </div>
    <v-textarea v-model="form.item1" auto-grow rows="5" clearable box />
    <div class="my-3">
      <p>
        5. จากวงจรด้านล่าง ถ้าสับสวิตซ์ลงผลลัพธ์จะเป็นอย่างไร
      </p>
      <v-img :src="require('../assets/question/q-2-2.png')" contain></v-img>
    </div>
    <v-textarea v-model="form.item2" auto-grow rows="5" clearable box />
    <div class="my-3">
      <p>
        6. จากวงจรด้านล่าง ถ้าถ่าน 9V ยังมีประจุอยู่ หากกดสวิตซ์จะเกิดอะไรขึ้น
      </p>
      <v-img :src="require('../assets/question/q-2-3.png')" contain></v-img>
    </div>
    <v-textarea v-model="form.item3" auto-grow rows="5" clearable box />
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
      item1: null,
      item2: null,
      item3: null
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

<style lang="scss" scoped>
>>> textarea {
  margin-top: 4px !important;
}
</style>
