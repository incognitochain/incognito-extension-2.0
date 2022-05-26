export const measure = async (obj: any, fname: string, ...params: any): Promise<{ elapsed: number; result: any }> => {
  const startTime = performance.now();
  const result: any = await obj[fname].bind(obj)(...params);
  const elapsed: number = performance.now() - startTime;
  return { elapsed, result };
};
