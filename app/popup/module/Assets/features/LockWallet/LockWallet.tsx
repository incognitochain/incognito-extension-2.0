import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { throttle } from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { LockIcon } from "@components/Icons";
import { actionLogout } from "@redux/account";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";

const Container = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`;

const LockWallet = React.memo(() => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const { showLoading } = useLoading();
  const dispatch: AppThunkDispatch = useDispatch();

  const onLockPressed = throttle(() => {
    showLoading({ value: true });
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Wallet locked" },
      onSuccess: () => {
        dispatch(actionLogout());
        showLoading({ value: false });
        history.push(Paths.unlockPage);
      },
    });
  }, 2000);

  return (
    <Container className="center hover-with-cursor">
      <LockIcon onClick={onLockPressed} />
    </Container>
  );
});

export default LockWallet;
