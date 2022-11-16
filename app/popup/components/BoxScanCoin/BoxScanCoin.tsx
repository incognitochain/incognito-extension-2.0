import React from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "@components/Core";
import { Row } from "@popup/theme";
import { useModal } from "@module/Modal";
import { useBackground } from "@popup/context/background";

const Styled = styled.div`
  padding: 24px 16px;
  .sub-title {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.primaryP8};
  }
`;

interface IProps {}

const BoxScanCoin = React.memo(() => {
  const { clearAllModal } = useModal();
  const { request } = useBackground();

  const onButtonPress = () => {
    if (clearAllModal) clearAllModal();
  };

  const onCancelPress = async () => {
    onButtonPress();
    try {
      request("popup_scan_coins_box_click", { isCancel: true }).then();
    } catch (e) {
      console.log("REQUEST SCAN ERROR: ", e);
    }
  };

  const onScanPress = async () => {
    onButtonPress();
    try {
      request("popup_scan_coins_box_click", { isCancel: false }).then();
    } catch (e) {
      console.log("REQUEST SCAN ERROR: ", e);
    }
  };

  return (
    <Styled>
      <p className="label fs-supermedium fw-medium">Confirm</p>
      <p className="label fs-regular fw-medium sub-title">
        You can skip this step if this is newly created keychain. Otherwise, scan your coins to recalculate your private
        balance. Please wait for a few hours. You can check its progress at the top right label.
      </p>
      <Row>
        <SecondaryButton onClick={onCancelPress}>Skip</SecondaryButton>
        <div style={{ width: 14 }} />
        <PrimaryButton onClick={onScanPress}>Sure</PrimaryButton>
      </Row>
    </Styled>
  );
});

export default BoxScanCoin;
