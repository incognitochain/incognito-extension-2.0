import LockIcon from "@popup/components/Icons/LockIcon";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { throttle } from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-right: 10px;
`;

const LockWallet = React.memo(() => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const { showLoading } = useLoading();

  const onLockPressed = throttle(() => {
    showLoading(true);
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Wallet locked" },
      onSuccess: (result) => {
        showLoading(false);
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
