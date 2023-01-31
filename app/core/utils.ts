//@ts-nocheck
import { TEMP_WALLET_INFO } from "@constants/common";
import Storage from "@services/storage";
import Server from "@services/wallet/Server";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP } from "./types";

const debug = require("debug");
const ObjectMultiplex = require("obj-multiplex");

const util = require("ethereumjs-util");
const Web3 = require("web3");
var Contract = require("web3-eth-contract");
const Wallet = require("ethereumjs-wallet").default;
const secp256k1 = require("secp256k1");
const bs58 = require("bs58");

export const createLogger = (module: string): any => {
  return debug(module);
};

export function enableLogger() {
  if (process.env.NODE_ENV === "development") {
    localStorage.setItem("debug", "*");
  }
  return;
}

export const createObjectMultiplex = (name: string): any => {
  return new ObjectMultiplex(name);
  // return (new ObjectMultiplex())
};

export const isInternalProcess = (processName: string): boolean => {
  return processName === ENVIRONMENT_TYPE_POPUP || processName === ENVIRONMENT_TYPE_NOTIFICATION;
};

export const checkForError = () => {
  const lastError = chrome.runtime.lastError;
  if (!lastError) {
    return;
  }
  // if it quacks like an Error, its an Error
  if (lastError.message) {
    return lastError;
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message);
};

const web3 = new Web3();
const GOVERNANCE_HELPER_ABI =
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[],"name":"BALLOT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROPOSAL_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"timestamp","type":"bytes"}],"name":"_buildSignBurnEncodeAbi","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"calldatas","type":"bytes[]"},{"internalType":"string","name":"description","type":"string"}],"name":"_buildSignProposal","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"calldatas","type":"bytes[]"},{"internalType":"string","name":"description","type":"string"}],"name":"_buildSignProposalEncodeAbi","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address[]","name":"targets","type":"address[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"calldatas","type":"bytes[]"},{"internalType":"string","name":"description","type":"string"}],"name":"_buildSignProposalEncodeAbi","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"},{"internalType":"uint8","name":"support","type":"uint8"}],"name":"_buildSignVoteEncodeAbi","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"}]';
const PROP_REQUEST = 1,
  VOTE_REQUEST = 2,
  RESHIELD_REQUEST = 3;

export const makeSignature = async (requestType: any, payload: any = {}, privateKey: any) => {
  var governanceHelper = new Contract(JSON.parse(GOVERNANCE_HELPER_ABI));
  let result: any = {};
  let signData;
  if (!payload || !privateKey) {
    result.err = "invalid input data";
    return result;
  }
  switch (requestType) {
    case PROP_REQUEST:
      // validate payload for create proposal
      if (!payload.targets || !payload.values || !payload.calldatas || !payload.description) {
        result.err = "invalid proposal data";
        return result;
      }
      const propEncode = governanceHelper.methods
        ._buildSignProposalEncodeAbi(
          web3.utils.keccak256("proposal"),
          payload.targets,
          payload.values,
          payload.calldatas,
          payload.description,
        )
        .encodeABI();
      signData = await genSignData("0x" + propEncode.slice(10));
      break;
    case VOTE_REQUEST:
      if (!payload.vote || !payload.proposal) {
        result.err = "invalid input vote data";
        return result;
      }
      const BALLOT = web3.utils.keccak256("Ballot(uint256 proposalId,uint8 support)");
      const proposalID = web3.utils.keccak256(
        Buffer.from(
          web3.eth.abi
            .encodeFunctionCall(
              {
                name: "myMethod",
                type: "function",
                inputs: [
                  {
                    type: "address[]",
                    name: "targets",
                  },
                  {
                    name: "values",
                    type: "uint256[]",
                  },
                  {
                    name: "calldatas",
                    type: "bytes[]",
                  },
                  {
                    name: "descriptionHash",
                    type: "bytes32",
                  },
                ],
              },
              [
                payload.proposal.targets,
                payload.proposal.values,
                payload.proposal.calldatas,
                web3.utils.keccak256(payload.proposal.description),
              ],
            )
            .slice(10),
          "hex",
        ),
      );
      const voteEncode =
        BALLOT + governanceHelper.methods._buildSignVoteEncodeAbi(proposalID, payload.vote).encodeABI().slice(10);
      signData = await genSignData(voteEncode);
      break;
    case RESHIELD_REQUEST:
      if (!payload.burnTX) {
        result.err = "invalid input reshield data";
        return result;
      }
      let temp = Uint8Array.from(Buffer.from(payload.burnTX, "hex"));
      temp.reverse();
      signData = "0x" + Buffer.from(temp).toString("hex");
      break;
    default:
      result.err = "invalid request";
      return result;
  }

  const signDataBuffer = Buffer.from(signData.slice(2), "hex");
  const signature = util.ecsign(signDataBuffer, privateKey);
  result = signature.r.toString("hex") + signature.s.toString("hex") + `0${signature.v - 27}`.toString("hex");
  return result;
};

const genSignData = async (data: any) => {
  const isMainnet = await Server.isMainnetDefault();

  const GOVERNANCE_ADDR = isMainnet
    ? "0x6D82713dE1FBB2bAa0d9d2A81Fca1244b87808eC"
    : "0x01f6549BeF494C8b0B00C2790577AcC1A3Fa0Bd0";
  
  const TYPE_HASH = web3.utils.keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)",
  );
  const NAME_HASH = web3.utils.keccak256("IncognitoDAO");
  const VERSION_HASH = web3.utils.keccak256("1");
  const CHAIN_ID = isMainnet ? "1" : "5";

  const temp = web3.utils.keccak256(
    "0x" +
      web3.eth.abi
        .encodeFunctionCall(
          {
            name: "myMethod",
            type: "function",
            inputs: [
              {
                name: "TYPE_HASH",
                type: "bytes32",
              },
              {
                name: "NAME_HASH",
                type: "bytes32",
              },
              {
                name: "VERSION_HASH",
                type: "bytes32",
              },
              {
                name: "CHAIN_ID",
                type: "uint256",
              },
              {
                name: "GOVERNANCE_ADDR",
                type: "address",
              },
            ],
          },
          [TYPE_HASH, NAME_HASH, VERSION_HASH, CHAIN_ID, GOVERNANCE_ADDR],
        )
        .slice(10),
  );
  return web3.utils.keccak256(
    web3.utils.encodePacked(
      { value: "\x19\x01", type: "string" },
      { value: temp, type: "bytes32" },
      { value: web3.utils.keccak256(data), type: "bytes32" },
    ),
  );
};

// generated eth from incKey success
export const genETHAccFromOTAKey = async (otaKey: any, payload: any) => {
  try {
    const web3 = new Web3();

    const proposalID = web3.utils.keccak256(
        Buffer.from(
          web3.eth.abi
            .encodeFunctionCall(
              {
                name: "myMethod",
                type: "function",
                inputs: [
                  {
                    type: "address[]",
                    name: "targets",
                  },
                  {
                    name: "values",
                    type: "uint256[]",
                  },
                  {
                    name: "calldatas",
                    type: "bytes[]",
                  },
                  {
                    name: "descriptionHash",
                    type: "bytes32",
                  },
                ],
              },
              [
                payload.targets,
                payload.values,
                payload.calldatas,
                web3.utils.keccak256(payload.description),
              ],
            )
            .slice(10),
          "hex",
        ),
      );
    let index = await Storage.getItem(proposalID);
    if (!index) {
      index = 0;
      await Storage.setItem(proposalID, "0");
    } else {
      index = parseInt(index) + 1;
      await Storage.setItem(proposalID, index.toString());
    }
    const indexToHex = bs58.encode(Buffer.from(index.toString(16).slice(2)));
    const proposalIdToHex = bs58.encode(Buffer.from(proposalID.toString(16).slice(2)));
    let bytes = bs58.decode(otaKey + proposalIdToHex + indexToHex);
    bytes = bytes.slice(1, bytes.length - 4);
    const privHexStr = web3.utils.bytesToHex(bytes);
    let privKey = web3.utils.keccak256(privHexStr);
    let temp, temp2;
    temp = web3.utils.hexToBytes(privKey);
    temp2 = new Uint8Array(temp);
    secp256k1.privateKeyVerify(temp2);
    while (!secp256k1.privateKeyVerify(temp2)) {
      privKey = web3.utils.keccak256(privKey);
      temp = web3.utils.hexToBytes(privKey);
      temp2 = new Uint8Array(temp);
    }
    const fixturePrivateBuffer = Buffer.from(privKey.replace("0x", ""), "hex");
    const wallet = Wallet.fromPrivateKey(fixturePrivateBuffer);
    return {
      address: wallet.getAddress().toString("hex"),
      privateKey: wallet.getPrivateKey().toString("hex"),
    };
  } catch (error) {
    console.log(error);
  }
};

export const genETHAccFromOTAKey2 = async (otaKey: any) => {
  try {
    const web3 = new Web3();
    let bytes = bs58.decode(otaKey);
    bytes = bytes.slice(1, bytes.length - 4);
    const privHexStr = web3.utils.bytesToHex(bytes);
    console.log({ privHexStr });
    let privKey = web3.utils.keccak256(privHexStr);
    let temp, temp2;
    temp = web3.utils.hexToBytes(privKey);
    temp2 = new Uint8Array(temp);
    secp256k1.privateKeyVerify(temp2);
    while (!secp256k1.privateKeyVerify(temp2)) {
      privKey = web3.utils.keccak256(privKey);
      temp = web3.utils.hexToBytes(privKey);
      temp2 = new Uint8Array(temp);
    }
    const fixturePrivateBuffer = Buffer.from(privKey.replace("0x", ""), "hex");
    const wallet = Wallet.fromPrivateKey(fixturePrivateBuffer);
    return {
      address: wallet.getAddress().toString("hex"),
      privateKey: wallet.getPrivateKey().toString("hex"),
    };
  } catch (error) {
    console.log(error);
  }
};

export const signMessage = async (signData, signerAddr, otaPrivateKey) => {
  let signerWallet;
  if (signerAddr) {
    signerWallet = JSON.parse(await Storage.getItem(TEMP_WALLET_INFO));
    if (signerWallet?.address !== signerAddr) return;
  } else {
    const dateToHex = bs58.encode(
      Buffer.from(
        Math.floor(Date.now() / 1000)
          .toString(16)
          .slice(2),
      ),
    );
    signerWallet = await genETHAccFromOTAKey2(otaPrivateKey + dateToHex);
    await Storage.setItem(TEMP_WALLET_INFO, JSON.stringify(signerWallet));
  }

  if (!signerWallet) {
    console.log("Something went wrong");
    return;
  }
  const hashData = web3.utils.keccak256(signData);
  const signDataBuffer = Buffer.from(hashData.slice(2), "hex");
  let sigResult = util.ecsign(signDataBuffer, Buffer.from(signerWallet.privateKey, "hex"));
  sigResult = sigResult.r.toString("hex") + sigResult.s.toString("hex") + `0${sigResult.v - 27}`.toString("hex");

  return { signature: sigResult, signer: signerWallet.address };
};
