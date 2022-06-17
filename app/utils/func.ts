export const measure = async (obj: any, fname: string, ...params: any): Promise<{ elapsed: number; result: any }> => {
  const startTime = performance.now();
  const result: any = await obj[fname].bind(obj)(...params);
  const elapsed: number = performance.now() - startTime;
  return { elapsed, result };
};

export const validURL = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  );
  return !!pattern.test(str);
};
