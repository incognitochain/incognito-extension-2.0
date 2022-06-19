import React from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "@components/Core";
import { Row } from "@popup/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { useModal } from "@module/Modal";
import { defaultAccountWalletSelector, keyDefineAccountSelector } from "@redux/account/account.selectors";
import { useBackground } from "@popup/context/background";
import { dispatch } from "@redux/store/store";
import { actionFistTimeScanCoins } from "@redux/scanCoins";

const Styled = styled.div`
  padding: 24px 16px;
  .sub-title {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.primaryP8};
  }
`;

interface IProps {}

const BoxScanCoin = React.memo((props: IProps) => {
  const dispatch: AppThunkDispatch = useDispatch();
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
    await accountSender.setNewAccountCoinsScan();
    dispatch(actionFistTimeScanCoins({ isScanning: false, otaKey: keyDefine }));
    request("popup_request_scan_coins", {});
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
      <p className="label fs-regular fw-medium sub-title">Do you want scan coins?</p>
      <Row>
        <SecondaryButton onClick={onCancelPress}>Cancel</SecondaryButton>
        <div style={{ width: 14 }} />
        <PrimaryButton onClick={onScanPress}>Sure</PrimaryButton>
      </Row>
    </Styled>
  );
});

export default BoxScanCoin;
