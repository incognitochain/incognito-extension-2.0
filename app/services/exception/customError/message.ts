import CODE from "./code";

const INSUFFICIENT_BALANCE = "Insufficient balance.";
const COIN_ADDED = "Coin added.";

export default {
  [CODE.timeout_promise]: "Timeout excuting funtion",
  [CODE.firebase_init_failed]:
    "Your device is not compatible with the app. Please contact go@incognito.org for support.",
  [CODE.network_make_request_failed]:
    "Please make sure you're connected to the internet, then try again.",
  [CODE.web_js_token_balance_is_zero]: INSUFFICIENT_BALANCE,
  [CODE.withdraw_balance_must_not_be_zero]: INSUFFICIENT_BALANCE,
  [CODE.withdraw_gen_withdraw_address_failed]: "Something went wrong. Please try again.",
  [CODE.getStarted_can_not_create_wallet_on_existed]:
    "Can not create new wallet on existing wallet.",
  [CODE.wallet_can_not_create_new_wallet]:
    "Unable to create new keychain. Please restart your app and try again.",
  [CODE.wallet_can_not_load_existed_wallet]:
    "Something's not quite right. Please make sure you're connected to the internet.\n" +
    "\n" +
    "If your connection is strong but the app still won't load, please contact us at go@incognito.org.\n",
  [CODE.createAccount_failed]: "Account was not created! Please try again.",
  [CODE.createAccount_existed_name]:
    "You already have a keychain with this name. Please try another.",
  [CODE.home_load_following_token_failed]:
    "Refresh your Assets screen to see your updated list of coins.",
  [CODE.home_load_balance_failed]: "Refresh this screen to reload your balance.",
  [CODE.importAccount_failed]: "Something went wrong. Please try again.",
  [CODE.importAccount_existed]: "This keychain already exists on this device. ",
  [CODE.web_js_import_existed_account]:
    "Please ensure this private key is valid, and has not already been imported to this device.",
  [CODE.web_js_import_invalid_key_2]: "Please try again with a valid private key.",
  [CODE.node_duplicate]: "This Node already exists on your device. Please try another.",
  [CODE.node_invalid_host]: "This address is not a valid domain or ip address. Please try another.",
  [CODE.getStarted_load_token_failed]:
    "Please make sure you're connected to the internet, then try again. If that doesn't work, contact go@incognito.org.",
  [CODE.user_login_failed]: "We have an authorization issue.",
  [CODE.paaps_invalid_daap_url]: "Please enter a valid pApp URL",
  [CODE.web_js_import_invalid_key]: "Please ensure this private key is valid.",
  [CODE.web_js_not_enough_coin]: INSUFFICIENT_BALANCE,
  [CODE.addBep2Token_not_found]: "This coin doesn't seem to exist. Please check and try again.",
  [CODE.api_add_private_token_already_existed]: COIN_ADDED,
  [CODE.api_not_supported_token]: "This coin is not supported by the app.",
  [CODE.addErc20Token_not_found]: COIN_ADDED,
  [CODE.addBep20Token_not_found]: COIN_ADDED,
  [CODE.api_qrcode_fail_ProductNotFound]: "This QR code is unfamiliar. Please try again.",
  [CODE.api_qrcode_fail_QRCodeAlreadyStaked]: "You've already set up this Node.",
  [CODE.node_auth_firebase_fail]: "Something’s not right. Please try to set up your Node again.",
  [CODE.node_verify_code_fail]:
    "Something’s not right. Please send an email to go@incognito.org so we can assist you directly.",
  [CODE.node_create_account_fail]: "Something’s not right. Please close the app and try again.",
  [CODE.node_can_not_connect_hotspot]:
    "Connection lost. Please open Wi-Fi settings on your device and connect to Node again.",
  [CODE.papp_can_not_opened]: "Could not open this pApp. Please check the URL and try again.",
  [CODE.papp_the_token_is_not_supported]: "The pApp doesn't support this coin. Please try another.",
  [CODE.api_invalid_size_upload_file]: "Please ensure your file size is smaller than 50 kB.",
  [CODE.document_picker_oversize]: "Please ensure your file size is smaller than 50 kB.",
  [CODE.document_picker_must_be_png]: "Please make sure your image is in PNG format.",
  [CODE.api_invalid_type_upload_file]: "Please make sure your image is in PNG format.",
  [CODE.NOT_ENOUGH_NETWORK_FEE_ADD]: "Please ensure you have enough PRV to cover the network fee.",
  [CODE.node_pending_withdrawal]:
    "Please try again after your previous transaction has finished processing.",
  [CODE.api_bnb_memo_required]: "Please supply a memo.",
  [CODE.FULLNODE_DOWN]: "The network is a little busy. Please try again later.",
  [CODE.api_unstake_fail]:
    "Please try again after your previous transaction has finished processing.",
  [CODE.web_js_can_not_created_tx]: "Something’s not quite right. Please try again later!",
  [CODE.api_trade_maintain]:
    "The exchange is down for maintenance. Please wait then try again later.",
  [CODE.api_insufficient_funds]: "The network is a little busy. Please try again later.",
  [CODE.web_js_can_not_send_main_crypto]:
    "Please consolidate UTXOs for this keychain in your Settings tab, then try again.",
  [CODE.api_tx_hash_invalid]:
    "This is taking a little longer than usual, but will be automatically retried soon. Simply check back later.",
  [CODE.master_key_name_existed]:
    "You already have a master key with this name. Please choose another.",
  [CODE.invalid_master_key_name]: "Master key names must be alphanumeric. Please choose another.",
  [CODE.invalid_mnemonic]: "That’s not quite right. Please try again.",
  [CODE.duplicate_mnemonic]: "This master key already exists on your device. Please try another.",
  [CODE.api_request_cancelled]: "Request cancelled.",
};
