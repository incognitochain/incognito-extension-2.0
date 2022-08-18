import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP } from "./types";

const debug = require("debug");
const ObjectMultiplex = require("obj-multiplex");

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
