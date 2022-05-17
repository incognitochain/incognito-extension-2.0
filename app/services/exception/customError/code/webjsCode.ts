import { codeCreator } from "../utils";
import TYPES from "../types";

const webjsError = codeCreator(TYPES.WEB_JS_ERROR);

/**
 * ONLY FOR WEBJS ERRORS
 */

// place error codes here
// should seperate codes by component
// format: component_code_id

const webJs = {
  web_js_token_balance_is_zero: webjsError(-4007),
  web_js_import_existed_account: webjsError(-2001),
  web_js_import_invalid_key: webjsError(-2005),
  web_js_import_invalid_key_2: webjsError(-2),
  web_js_not_enough_coin: webjsError(-5),
  web_js_can_not_created_tx: webjsError(-3002),
  web_js_can_not_send_main_crypto: webjsError(-3006),
};

export const STACK_TRACE = {
  REPLACEMENT: "Replacement or Cancel Tx Error",
  NOT_ENOUGH_COIN: "Not enough coin",
};

export default {
  ...webJs,
};
