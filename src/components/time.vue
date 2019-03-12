<template>
  <v-card class="my-4 mx-auto" max-width="430px">
    <v-card-title primary-title>
      <div class="ma-auto text-xs-center">
        <p class="headline">
          <span>เวลาที่เหลือให้น้องๆใช้ระบบรับสมัคร</span>
        </p>
        <p>สมัคร : {{ regisTime }}</p>
        <p>ตอบคำถาม : {{ questionTime }}</p>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import { tOut1, tOut2 } from "./../core/timing";
import bus from "./../core/bus";

export default {
  data: () => ({
    regisTime: "",
    questionTime: ""
  }),
  beforeMount() {
    let iRegis = setInterval(() => {
      let distance = tOut1.getTime() - new Date().getTime();
      this.regisTime = this.time2text(distance);

      if (distance < 0) {
        clearInterval(iRegis);
        this.regisTime = "หมดเวลา";
        bus.$emit("reg.close");
      }
    }, 1000);

    let iQus = setInterval(() => {
      let distance = tOut2.getTime() - new Date().getTime();
      this.questionTime = this.time2text(distance);

      if (distance < 0) {
        clearInterval(iQus);
        this.questionTime = "หมดเวลา";
        bus.$emit("qus.close");
      }
    }, 1000);
  },
  methods: {
    time2text(val) {
      let days = Math.floor(val / (1000 * 60 * 60 * 24));
      let hours = Math.floor((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((val % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((val % (1000 * 60)) / 1000);

      return `${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
    }
  }
};
</script>

<style scoped>
span{
  font-family: "Kanit", sans-serif;
}
</style>
