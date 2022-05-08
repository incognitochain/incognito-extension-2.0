import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { DialogForm } from "./dialog-form";
import { useCallAsync } from "../../utils/notifications";
import { DialogProps } from "@mui/material";
import { useBackground } from "../../context/background";
import { Token } from "../../../core/types";

export type Props = Omit<DialogProps, "onClose"> & {
  token: Token;
  onClose: () => void;
};

export const UpdateTokenDialog: React.FC<Props> = ({ token, open, onClose, children, ...rest }) => {
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const oldMint = token.mintAddress;
  let [mintAddress, setMintAddress] = useState(oldMint);
  let [tokenName, setTokenName] = useState(token.name);
  let [tokenSymbol, setTokenSymbol] = useState(token.symbol);
  let [sending, setSending] = useState(false);

  const canSend = (): boolean => {
    return mintAddress !== "" && tokenName !== "" && tokenSymbol !== "";
  };

  const onSubmit = () => {
    setSending(true);
    callAsync(
      request("popup_updateToken", {
        mintAddress: oldMint,
        token: {
          mintAddress: mintAddress,
          name: tokenName,
          symbol: tokenSymbol,
        },
      }),
      {
        progress: { message: "Updating token..." },
        success: { message: "Success!" },
        onFinish: () => {
          setSending(false);
          onClose();
        },
      },
    );
  };

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={onSubmit}>
      <DialogTitle>Add Token</DialogTitle>
      <DialogContent>
        <TextField
          label="Token Mint Address"
          fullWidth
          variant="outlined"
          margin="normal"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />
        <TextField
          label="Token Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <TextField
          label="Token Symbol"
          fullWidth
          variant="outlined"
          margin="normal"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={!canSend || sending}>
          Add
        </Button>
      </DialogActions>
    </DialogForm>
  );
};
