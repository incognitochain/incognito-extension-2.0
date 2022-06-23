/* eslint-disable no-unsafe-finally */
/* eslint-disable no-useless-catch */
import _ from "lodash";
import storage from "@services/storage";
const {
  PANCAKE_CONSTANTS,
  WEB3_CONSTANT,
  BSC_CONSTANT,
  UNI_CONSTANTS,
} = require("incognito-chain-web-js/build/web/wallet");

export const MAINNET_FULLNODE = "https://fullnode.incognito.org/fullnode";
export const MAINNET_1_FULLNODE = "http://51.83.237.20:9338";
export const TESTNET_FULLNODE = "https://testnet.incognito.org/fullnode";
export const TESTNET1_FULLNODE = "https://testnet1.incognito.org/fullnode";
export const DEV_TEST_FULLNODE = "http://172.105.114.134:8334";

export const DEFAULT_SHARD_NUMBER = 8;

export type NetworkType = "mainnet" | "testnet";
export interface AddNetworkProps {
  name: string;
  url: string;
  shardNumber: number;
  networkType: NetworkType;
}

export interface ServerModel {
  id: string;
  default?: boolean;
  address: string;
  name?: string;
  coinServices?: any;
  pubsubServices?: any;
  requestServices?: any;
  apiServices?: any;
  shardNumber?: any;
  IncContractAddress?: any;
  IncBSCContractAddress?: any;
  tradeServices?: any;
  webviewChartServices?: any;
  bscConfigs?: any;
  web3Configs?: any;
  pancakeConfigs?: any;
  uniConfigs?: any;
  portalServices?: any;
}

const MAIN_NET_SERVER = {
  id: "mainnet",
  default: true,
  address: MAINNET_FULLNODE,
  name: "Mainnet",
  coinServices: "https://api-coinservice.incognito.org",
  apiServices: "https://api-service.incognito.org",
  shardNumber: DEFAULT_SHARD_NUMBER,
  IncContractAddress: "0x43D037A562099A4C2c95b1E2120cc43054450629",
  IncBSCContractAddress: "0x43D037A562099A4C2c95b1E2120cc43054450629",
  explorer: "https://explorer.incognito.org",
  tradeServices: "https://api-coinservice.incognito.org",
  portalServices: "https://api-portalv4.incognito.org",
  webviewChartServices: "https://chart-webview.incognito.org",
  bscConfigs: BSC_CONSTANT.BSC_MAINNET_CONFIGS,
  pancakeConfigs: PANCAKE_CONSTANTS.PANCAKE_MAINNET_CONFIGS,
  uniConfigs: UNI_CONSTANTS.UNI_MAINNET_CONFIGS,
  web3Configs: WEB3_CONSTANT.WEB3_MAINNET_CONFIGS,
};

const TEST_NET_SERVER = {
  id: "testnet",
  default: false,
  address: TESTNET_FULLNODE,
  name: "Testnet",
  shardNumber: DEFAULT_SHARD_NUMBER,
  coinServices: "https://api-coinservice-staging.incognito.org",
  apiServices: "https://staging-api-service.incognito.org",
  IncContractAddress: "0x2f6F03F1b43Eab22f7952bd617A24AB46E970dF7",
  IncBSCContractAddress: "0x2f6F03F1b43Eab22f7952bd617A24AB46E970dF7",
  explorer: "https://testnet.incognito.org",
  tradeServices: "https://api-coinservice-staging.incognito.org",
  portalServices: "http://51.161.119.66:8020",
  webviewChartServices: "https://chart-webview-staging.incognito.org",
  bscConfigs: BSC_CONSTANT.BSC_TESTNET_CONFIGS,
  pancakeConfigs: PANCAKE_CONSTANTS.PANCAKE_TESTNET_CONFIGS,
  uniConfigs: UNI_CONSTANTS.UNI_TESTNET_CONFIGS,
  web3Configs: WEB3_CONSTANT.WEB3_TESTNET_CONFIGS,
};

const DEFAULT_LIST_SERVER = [TEST_NET_SERVER, MAIN_NET_SERVER];

export const KEY = {
  SERVER: "$servers",
  DEFAULT_LIST_SERVER,
};

export default class Server {
  static async setServerListToStorage(serverList: ServerModel[]): Promise<void> {
    await storage.setItem(KEY.SERVER, JSON.stringify(serverList));
  }

  static async getServerListFromStorage(): Promise<ServerModel[]> {
    const serverListJSON = await storage.getItem(KEY.SERVER);
    return (serverListJSON && JSON.parse(serverListJSON)) || [];
  }

  static async clearServerListFromStorage(): Promise<void> {
    await storage.removeItem(KEY.SERVER);
  }

  static async getServerList(): Promise<ServerModel[]> {
    let serverList: ServerModel[] = [];
    try {
      serverList = await Server.getServerListFromStorage();
      if (serverList && serverList.length < 1) {
        serverList = DEFAULT_LIST_SERVER;
        await storage.setItem(KEY.SERVER, JSON.stringify(serverList));
      }
    } catch (error) {
      console.log("[getServerList] ERROR: ", error);
    } finally {
      return serverList;
    }
  }

  static async getDefault(): Promise<ServerModel> {
    const serverList = await Server.getServerList();
    const serverDefaultFilter = serverList.filter((server) => server.default);
    const serverDefault = serverDefaultFilter.length > 0 ? serverDefaultFilter[0] : MAIN_NET_SERVER;
    return serverDefault;
  }

  static async setDefaultServer(defaultServer: ServerModel): Promise<void> {
    try {
      const serverList = await Server.getServerList();
      const newServerList = serverList.map((server: ServerModel) => {
        if (defaultServer.address === server.address) {
          return {
            ...server,
            default: true,
          };
        }
        return { ...server, default: false };
      });
      await Server.setServerListToStorage(newServerList);
    } catch (e) {
      throw e;
    }
  }

  static async checkExistNetworkWithId(address: string, networkType: NetworkType): Promise<boolean> {
    try {
      const serverList = await Server.getServerList();
      let isExist = false;
      serverList.map((server: ServerModel) => {
        if (server.address === address && server.id === networkType) {
          isExist = true;
          return;
        }
      });
      return isExist;
    } catch (e) {
      throw e;
    }
  }

  static async addNetwork(newNetwork: AddNetworkProps): Promise<void> {
    // await this.clearServerListFromStorage();
    try {
      const serverList = await Server.getServerList();
      const { name, networkType, shardNumber, url } = newNetwork;
      const isExist = await Server.checkExistNetworkWithId(url, networkType);
      if (isExist) {
        throw new Error("Network already exists");
      }
      let newServerModel =
        networkType === "mainnet"
          ? {
              ...MAIN_NET_SERVER,
            }
          : {
              ...TEST_NET_SERVER,
            };
      newServerModel = {
        ...newServerModel,
        id: networkType,
        default: false,
        address: url,
        name,
        shardNumber,
      };
      serverList.push(newServerModel);
      const newServerList = [...serverList];
      await Server.setServerListToStorage(newServerList);
    } catch (e) {
      throw new Error("Network already exists");
    }
  }

  static isMainnet(network: ServerModel) {
    return _.isEqual(network.id, "mainnet");
  }

  static async isMainnetDefault() {
    const currentNetworkId = await Server.getNetwork();
    console.log("currentNetworkId ", currentNetworkId);
    return _.isEqual(currentNetworkId, "mainnet");
  }

  static async getNetwork(): Promise<string> {
    const server = await Server.getDefault();
    return server.id;
  }

  static setDefaultList() {
    try {
      return Server.setServerListToStorage(KEY.DEFAULT_LIST_SERVER);
    } catch (e) {
      throw e;
    }
  }
}
