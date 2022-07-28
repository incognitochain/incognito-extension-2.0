(globalThis as any).window = globalThis as any;
(globalThis as any).requestAnimationFrame = function (): any {
  return "requestAnimationFrame";
};
(globalThis as any).cancelAnimationFrame = function (): any {
  return "cancelAnimationFrame";
};

export {};
