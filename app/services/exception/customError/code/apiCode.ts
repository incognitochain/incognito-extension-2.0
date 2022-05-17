import TYPES from "../types";
import { codeCreator } from "../utils";

const apiError = codeCreator(TYPES.API_ERROR);

/**
 * ONLY FOR API ERRORS
 */

// place error codes here
// should seperate codes by component
// format: component_code_id

const api = {
  api_email_invalid: apiError(-1000),
  api_email_existed: apiError(-1005),
  api_invalid_arguments: apiError(-9000),
  api_invalid_limit: apiError(-9002),
  api_paymentaddres_existed: apiError(-100002),
  api_transfer_fail: apiError(-100003),
  api_add_private_token_already_existed: apiError(-1023),
  api_not_supported_token: apiError(-1029),
  api_qrcode_fail_ProductNotFound: apiError(-80008),
  api_qrcode_fail_QRCodeAlreadyStaked: apiError(-80009),
  api_invalid_size_upload_file: apiError(-8002),
  api_invalid_type_upload_file: apiError(-8001),
  api_bnb_memo_required: apiError(-1027),
  api_unstake_fail: apiError(-80011),
  api_tx_added: apiError(-80002),
  api_amount_invalid: apiError(-80003),
  api_trade_maintain: apiError(-2009),
  api_insufficient_funds: apiError(-1024),
  api_tx_hash_invalid: apiError(-80006),
  api_request_cancelled: apiError(-80007),
};

export default {
  ...api,
};
