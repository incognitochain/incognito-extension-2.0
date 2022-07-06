import { MintInfo, Token as SPLToken } from "@solana/spl-token";
import { CompiledInstruction, Connection, Message, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import * as shortvec from "./shortvec-encoding";
import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, Token } from "./types";

const debug = require("debug");
const ObjectMultiplex = require("obj-multiplex");
export const createLogger = (module: string): any => {
  return debug(module);
};
const log = createLogger("incognito:util");

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

const PUBKEY_LENGTH = 32;

export const decodeSerializedMessage = (buffer: Buffer): Message => {
  log("Decoding serialized message: %O", buffer);
  let byteArray = [...buffer];

  const numRequiredSignatures = byteArray.shift() as number;
  const numReadonlySignedAccounts = byteArray.shift() as number;
  const numReadonlyUnsignedAccounts = byteArray.shift() as number;

  const accountCount = shortvec.decodeLength(byteArray);
  let accountKeys = [];
  for (let i = 0; i < accountCount; i++) {
    const account = byteArray.slice(0, PUBKEY_LENGTH);
    byteArray = byteArray.slice(PUBKEY_LENGTH);
    accountKeys.push(bs58.encode(Buffer.from(account)));
  }

  const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH);
  byteArray = byteArray.slice(PUBKEY_LENGTH);

  const instructionCount = shortvec.decodeLength(byteArray);
  let instructions = [];
  for (let i = 0; i < instructionCount; i++) {
    let instruction = {} as CompiledInstruction;
    instruction.programIdIndex = byteArray.shift() as number;
    const accountCount = shortvec.decodeLength(byteArray);
    instruction.accounts = byteArray.slice(0, accountCount);
    byteArray = byteArray.slice(accountCount);
    const dataLength = shortvec.decodeLength(byteArray);
    const data = byteArray.slice(0, dataLength);
    instruction.data = bs58.encode(Buffer.from(data));
    byteArray = byteArray.slice(dataLength);
    instructions.push(instruction);
  }

  const messageArgs = {
    header: {
      numRequiredSignatures,
      numReadonlySignedAccounts,
      numReadonlyUnsignedAccounts,
    },
    recentBlockhash: bs58.encode(Buffer.from(recentBlockhash)),
    accountKeys,
    instructions,
  };
  return new Message(messageArgs);
};
