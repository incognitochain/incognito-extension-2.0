import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { throttle } from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  margin-right: 10px;
`;

const LockWallet = React.memo(() => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();

  const onLockPressed = throttle(() => {
    console.log("onLockPressed TO DO ");
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Wallet locked" },
      onSuccess: (result) => {
        console.log(" TO DO ");
        history.push(Paths.unlockPage);
      },
    });
  }, 2000);

  return (
    <Container className="tooltip">
      <IconButton onClick={onLockPressed}>
        <LockOutlinedIcon />
      </IconButton>
      <span className="tooltiptext">Lock Wallet</span>
    </Container>
  );
});

export default LockWallet;
