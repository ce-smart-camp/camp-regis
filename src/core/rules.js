let rules = {};

rules.required = value => !!value || "คําถามซึ่งไร้คนตอบ";

rules.required_uni = camp => value => {
  return !camp ? !value || "ไม่ต้องกรอก" : !!value || "คําถามซึ่งไร้คนตอบ";
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

function checkDate(val) {
  if (!val) return true;
  if (val.length === 0) return true;
  if (val.length != 10) return false;

  let [day, month, year] = val.split("/");
  var date = new Date();
  date.setFullYear(year, month - 1, day);
  if (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  )
    return true;

  return false;
}

rules.date = val => checkDate(val) || "รูปแบบไม่ถูกต้อง";

export default rules;
