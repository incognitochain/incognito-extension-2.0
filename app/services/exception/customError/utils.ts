/**
 *
 * @param {number} number
 * Make sure `number` is unique!!!
 */
export const genCode = (type: string, number: number): string => {
  return `${type}(${number})`;
};

/**
 *
 * @param {number} number
 * Make sure `number` is unique!!!
 */
export const codeCreator = (type: any) => {
  const codes = {} as { [key: string]: boolean };
  return (number: any) => {
    if (codes[number]) throw new Error(`Code ${number} is existed!`);
    codes[number] = true;
    return genCode(type, number);
  };
};
