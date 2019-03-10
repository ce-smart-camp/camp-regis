import bus from "./bus";

const tOut1 = new Date(1554829200000); // 10 เมษายน 2019 เวลา 0:00:00
const tOut2 = new Date(1555693200000); // 20 เมษายน 2019 เวลา 0:00:00

export { tOut1, tOut2 };

bus.$on("reg.close", val => {
  if (val)
    bus.$emit(
      "dialog.on",
      "ขณะนี้หมดเวลาการรับสมัคร และแก้ไขข้อมูลส่วนตัวแล้วครับ"
    );
});

bus.$on("qus.close", val => {
  if (val)
    bus.$emit(
      "dialog.on",
      "ขณะนี้หมดเวลาการตอบคำถามแล้วครับ น้องๆรอฟังข่าวดีได้เลย"
    );
});
