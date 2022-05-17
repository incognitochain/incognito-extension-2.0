export default {
  /**
   * error from backend. Ex: generate deposit address, register user token,...
   */
  API_ERROR: "API_ERROR",

  /**
   * Default type. Use this type for create a CustomError message, which can be displayed to user (friendly message)
   * Ex: `new CustomError(ErrorCode.network_make_request_failed)`
   */
  KNOWN_ERROR: "KNOWN_ERROR",

  /**
   * Error from web-js module
   */
  WEB_JS_ERROR: "WEB_JS_ERROR",
};
