let rules = {};

rules.required = value => !!value || "คำถามที่ต้องการคำตอบ";

rules.required_uni = camp => value => {
  console.log(camp, value);
  return !camp ? !value || "ไม่ต้องกรอก" : !!value || "คำถามที่ต้องการคำตอบ";
};

rules.phone = value => {
  if (value === null) return true;
  return value.charAt(0) === "0" || "รูปแบบไม่ถูกต้อง";
};

rules.email = value => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "รูปแบบไม่ถูกต้อง";
};

rules.gpax = value => {
  if (value == null) return true;
  return Number(value) <= 4 || "ค่ามากสุดคือ 4.00";
};

function checkID(id) {
  if (!id) return true;
  if (id.length === 0) return true;
  if (id.length != 13) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(id.charAt(i)) * (13 - i);
  return (11 - (sum % 11)) % 10 === Number(id.charAt(12));
}

rules.national_id = val => checkID(val) || "เลขที่กรอกไม่ถูกต้อง";

rules.prefix = val =>
  !/^(นาย|นาง(สาว)?|น\.?ส\.?|ด\.?(ญ|ช)\.?) ?/.test(val) ||
  "ก็บอกว่าไม่ต้องใส่คำนำหน้าไง";

rules.thai = val =>
  /^[\u0E00-\u0E7F ]+$/.test(val) || "สามารถกรอกได้แค่ภาษาไทย";

export default rules;
