import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";

export const DialogForm: React.FC<DialogProps> = ({
  open,
  onClose,
  onSubmit,
  children,
  ...rest
}) => (
  <Dialog
    open={open}
    PaperProps={{
      onSubmit: (e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
      },
    }}
    onClose={onClose}
  >
    {children}
  </Dialog>
);
