
declare global {
  namespace NodeJS {
    interface Global {
      isMainnet: any;
      severDefault: any;
      homeConfig: any;
      __DEV__: boolean
    }
  }
}
export default {
  global,
};