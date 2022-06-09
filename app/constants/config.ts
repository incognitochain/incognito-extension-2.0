import { MAINNET_FULLNODE, TESTNET_FULLNODE } from "@services/wallet/Server";
import { isMainnet } from "@popup/configs";
export const MAIN_WEBSITE = "https://we.incognito.org";

const PASSPHRASE_WALLET_DEFAULT = "PASSPHRASE_WALLET_DEFAULT";

const COINS_SERVICE_URL = "https://api-coinservice.incognito.org";

const API_BASE_URL = isMainnet
  ? "https://api-service.incognito.org"
  : global.severDefault
  ? global.severDefault.apiServices
  : "https://staging-api-service.incognito.org";
const API_BASE_URL2 = isMainnet
  ? "https://device-network.incognito.org/"
  : "https://device-network-staging.incognito.org/";
const API_BASE_URL3 = "https://device-network.incognito.org/";
const ETHERSCAN_URL = isMainnet ? "https://etherscan.io" : "https://kovan.etherscan.io";
const BSCSCAN_URL = isMainnet ? "https://bscscan.com" : "https://testnet.bscscan.com";
const POLYGONSCAN_URL = isMainnet ? "https://polygonscan.com" : "https://mumbai.polygonscan.com/";
const BTC_EXPLORER_URL = isMainnet ? "https://live.blockcypher.com/btc" : "https://live.blockcypher.com/btc-testnet";
const DEX_BINANCE_TOKEN_URL = isMainnet
  ? "https://dex.binance.org/api/v1/tokens"
  : "https://testnet-dex.binance.org/api/v1/tokens";
const BINANCE_EXPLORER_URL = isMainnet ? "https://explorer.binance.org" : "https://testnet-explorer.binance.org";
const INCOGNITO_TOKEN_ICON_URL = isMainnet
  ? "https://storage.googleapis.com/incognito/wallet/tokens/icons"
  : "https://storage.googleapis.com/incognito/wallet-testnet/tokens/icons";
const EXPLORER_CONSTANT_CHAIN_URL = isMainnet
  ? "https://explorer.incognito.org"
  : global.severDefault
  ? global.severDefault.explorer
  : "https://testnet.incognito.org"; // Change explorer
const MASTER_NODE_ADDRESS = isMainnet ? MAINNET_FULLNODE : TESTNET_FULLNODE;
const NODE_URL = "https://node.incognito.org/node.html";
const USDT_TOKEN_ID = isMainnet
  ? "716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0"
  : "fdd928bc86c82bd2a7c54082a68332ebb5f2cde842b1c2e0fa430ededb6e369e";
const TRACK_LOG_URL = "https://device-network.incognito.org";

const ETH_TOKEN_ID = isMainnet
  ? "ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f"
  : "ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854";

const CRYPTO_ICON_URL = "https://statics.incognito.org/cmc/symbols/128x128";

const HOME_CONFIG_DATA =
  global.homeConfig !== "staging"
    ? "https://api-data.incognito.org/v2/home-configs"
    : "https://api-data-staging.incognito.org/v2/home-configs";

const NODE_MONITOR_URL = isMainnet ? "https://monitor.incognito.org/" : "http://51.91.72.45:36215/";
const NODE_MONITOR_DETAIL_URL = NODE_MONITOR_URL + "monitor-detail?mpk=";

const HOME_CONFIG_EVENT = () => {
  const isStaging = global.homeConfig !== "staging";
  const prefix = "https://";
  const content = `${isStaging ? "hunt" : "hunt-staging"}.incognito.org`;
  return {
    title: content,
    url: prefix + content,
  };
};

const HUNT_CONFIG_QR_CODE = () => {
  const isStaging = global.homeConfig !== "staging";
  const prefix = "https://api-hunt";
  const content = `${isStaging ? "" : "-staging"}.incognito.org/api/app/txqrcode/`;
  return prefix + content;
};

// const APP_VERSION = isMainnet
//   ? `https://api-service.incognito.org/system/${isIOS() ? "ios" : "android"}/last-version`
//   : `https://staging-api-service.incognito.org/system/${isIOS() ? "ios" : "android"}/last-version`;

const URL_SERVICE_UPDATE_FIRMWARE = `https://${
  global.isMainnet ? "" : "staging-"
}api-service.incognito.org/pool/check-lan-setup`;

const FAUCET_URL = "https://faucet.incognito.org/";
export default {
  isMainnet,
  CRYPTO_ICON_URL,
  INCOGNITO_TOKEN_ICON_URL,
  API_BASE_URL,
  EXPLORER_CONSTANT_CHAIN_URL,
  MASTER_NODE_ADDRESS,
  DEX_BINANCE_TOKEN_URL,
  ETHERSCAN_URL,
  BSCSCAN_URL,
  POLYGONSCAN_URL,
  BTC_EXPLORER_URL,
  BINANCE_EXPLORER_URL,
  USDT_TOKEN_ID,
  NODE_URL,
  TRACK_LOG_URL,
  MAIN_WEBSITE,
  ETH_TOKEN_ID,
  MAINNET_FULLNODE,
  TESTNET_FULLNODE,
  HOME_CONFIG_DATA,
  API_BASE_URL2,
  API_BASE_URL3,
  // APP_VERSION,
  HOME_CONFIG_EVENT,
  HUNT_CONFIG_QR_CODE,
  URL_SERVICE_UPDATE_FIRMWARE,
  NODE_MONITOR_URL,
  NODE_MONITOR_DETAIL_URL,
  FAUCET_URL,
  PASSPHRASE_WALLET_DEFAULT,

  COINS_SERVICE_URL,
};
