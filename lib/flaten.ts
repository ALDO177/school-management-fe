export type AnyObject = { [key: string]: any };

export const flattenObject = (obj: AnyObject, parentKey = ""): AnyObject => {
  return Object.keys(obj).reduce((acc: AnyObject, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};