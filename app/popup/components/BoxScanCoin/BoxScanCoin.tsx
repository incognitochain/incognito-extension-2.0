import React from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "@components/Core";
import { Row } from "@popup/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { useModal } from "@module/Modal";
import { defaultAccountWalletSelector, keyDefineAccountSelector } from "@redux/account/account.selectors";
import { useBackground } from "@popup/context/background";
import { actionFistTimeScanCoins } from "@redux-sync-storage/scanCoins";

const Styled = styled.div`
  padding: 24px 16px;
  .sub-title {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.primaryP8};
  }
`;

interface IProps {}

const BoxScanCoin = React.memo((props: IProps) => {
  const dispatch = useDispatch();
  const accountSender = useSelector(defaultAccountWalletSelector);
  const keyDefine = useSelector(keyDefineAccountSelector);
  const { clearAllModal } = useModal();
  const { request } = useBackground();

  const onButtonPress = () => {
    if (clearAllModal) clearAllModal();
  };

  const onCancelPress = async () => {
    onButtonPress();
    const otaKey = accountSender.getOTAKey();
    if (!otaKey || !keyDefine) return;
    dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    try {
      await accountSender.setNewAccountCoinsScan();
    } catch (e) {
      console.log("STORAGE ERROR: ", e);
    }
    try {
      request("popup_request_scan_coins", {});
    } catch (e) {
      console.log("REQUEST SCAN ERROR: ", e);
    }
  };

  const onScanPress = async () => {
    onButtonPress();
    const otaKey = accountSender.getOTAKey();
    if (!otaKey || !keyDefine) return;
    dispatch(actionFistTimeScanCoins({ isScanning: true, otaKey: keyDefine }));
    request("popup_request_scan_coins", {});
  };

  return (
    <Styled>
      <p className="label fs-supermedium fw-medium">Confirm</p>
      <p className="label fs-regular fw-medium sub-title">
        If this is an old keychain, scanning coins helps to recalculate your private balance. Otherwise, you can skip
        this step.
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
