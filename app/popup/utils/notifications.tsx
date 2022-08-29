import React, { useState } from "react";
import Button from "@mui/material/Button";
import { OptionsObject, useSnackbar } from "notistack";

interface notifOptions {
  message?: string;
  variant?: OptionsObject["variant"];
}

interface errorNotifOptions extends notifOptions {
  errorMapper?: (error: unknown) => string;
}

interface callAsyncOpts<T> {
  progress?: notifOptions;
  success?: notifOptions;
  error?: errorNotifOptions;
  onSuccess?: (result: T) => void;
  onError?: (err: any) => void;
  onFinish?: () => void;
}

export function useCallAsync<T>() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return async function callAsync<T>(promise: Promise<T>, opts: callAsyncOpts<T>) {
    const { progress, success, error, onSuccess, onError, onFinish } = opts;
    const id = enqueueSnackbar(progress?.message || "Submitting...", {
      variant: progress?.variant ?? "info",
      persist: true,
    });
    try {
      let result = await promise.then();

      console.log(" useCallAsync => Result ", {
        id,
        result,
      });
      closeSnackbar(id);
      if (success?.message) {
        enqueueSnackbar(success.message, { variant: success.variant ?? "success" });
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (e) {
      console.log(" useCallAsync ERROR ", e);

      closeSnackbar(id);

      let message: string = e.message || (e !== null ? e.toString() : "Unknown error");
      if (error?.message) {
        message = error.message;
      } else if (error?.errorMapper) {
        message = error?.errorMapper(e);
      }

      enqueueSnackbar(message, { variant: error?.variant ?? "error" });
      if (onError) {
        onError(e);
      }
    }
    if (onFinish) {
      onFinish();
    }
  };
}
