import bus from "./bus";

const tOut1 = new Date(1554915600000); // 11 เมษายน 2019 เวลา 0:00:00
const tOut2 = new Date(1555779600000); // 21 เมษายน 2019 เวลา 0:00:00

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
