function copyObject(obj) {
  if (obj === null) return null;

  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") newObj[key] = copyObject(obj[key]);
    else {
      if (obj[key] === "") obj[key] = null;
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
        if (obj[key] === "-") obj[key] = null;
      }
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default copyObject;
