/**
 * Prevent redux type maybe duplicate
 * @param {string} namespace
 * @param {string} type
 */
export const genNamspace = (namespace: string) => (type: string) => {
  const _namespace = namespace || "";
  const _type = type || "";
  return `${String(_namespace).toUpperCase()}/${String(_type).toUpperCase()}`;
};
