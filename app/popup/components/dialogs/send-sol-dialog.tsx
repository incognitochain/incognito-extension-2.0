import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DialogForm } from "./dialog-form";
import InputAdornment from "@mui/material/InputAdornment";
import { useCallAsync, useSendTransaction } from "../../utils/notifications";
import { DialogProps } from "@mui/material";
import { BalanceInfo } from "../../types";
import { useBackground } from "../../context/background";
import { PublicKey } from "@solana/web3.js";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void;
  fromPublicKey: PublicKey;
  balanceInfo: BalanceInfo;
};

export const SendSolDialog: React.FC<Props> = ({ open, onClose, fromPublicKey, balanceInfo }) => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [transferAmountString, setTransferAmountString] = useState("");
  const [, sending] = useSendTransaction();

  let { amount, token } = balanceInfo;

  function onSubmit() {
    let lamports = Math.round(parseFloat(transferAmountString) * Math.pow(10, token.decimals));
    if (!lamports || lamports <= 0) {
      throw new Error("Invalid amount");
    }

    callAsync(
      request("popup_sendSolToken", {
        transfer: {
          fromPubkey: fromPublicKey.toBase58(),
          toPubkey: destinationAddress,
          lamports: lamports,
        },
      }),
      {
        progress: { message: "Transferring..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose();
        },
      },
    );
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={onSubmit}>
      <DialogTitle>Send SOL</DialogTitle>
      <DialogContent>
        <TextField
          label="Recipient Address"
          fullWidth
          variant="outlined"
          margin="normal"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value.trim())}
        />
        <TextField
          label="Amount"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          InputProps={{
            endAdornment: token.symbol ? <InputAdornment position="end">{token.symbol}</InputAdornment> : null,
            inputProps: {
              step: Math.pow(10, -token.decimals),
            },
          }}
          value={transferAmountString}
          onChange={(e) => setTransferAmountString(e.target.value.trim())}
          helperText={`Max: ${amount / BigInt(Math.pow(10, token.decimals))}`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={sending}>
          Send
        </Button>
      </DialogActions>
    </DialogForm>
  );
};
