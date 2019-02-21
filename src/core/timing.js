import bus from "./bus";
const tOut1 = new Date(1554829200000); // 10 เมษายน 2019 เวลา 0:00:00
const tOut2 = new Date(1555693200000); // 20 เมษายน 2019 เวลา 0:00:00

let now = new Date();

setTimeout(() => {
  bus.$emit("reg.close");
  console.log("aaaa");
}, tOut1.getTime() - now.getTime());

setTimeout(() => {
  bus.$emit("qus.close");
}, tOut2.getTime() - now.getTime());

export { tOut1, tOut2 };
