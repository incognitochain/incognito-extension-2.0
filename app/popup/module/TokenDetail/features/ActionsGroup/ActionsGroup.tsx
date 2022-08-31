import React from "react";
import styled, { ITheme } from "styled-components";
import { Button } from "@components/Core";
import { useHistory } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { route as QRCodeRoute } from "@module/QRCode";
import { actionFreeData } from "@module/Send/Send.actions";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
import { route as SendRoute } from "@module/Send/Send.route";
import { actionSelectedPrivacySet } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.actions";
import { selectedPrivacyToken } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import { AppThunkDispatch } from "@redux/store";
import { reset } from "redux-form";
import { getPaymentAddressSelector } from "@redux-sync-storage/account";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  .btn-container {
    height: 32px;
    width: 80px;
    margin-right: 4px;
    margin-left: 4px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    :hover {
      background-color: ${({ theme }: { theme: ITheme }) => theme.colorP3};
    }
  }
`;

const ActionsGroup = React.memo(() => {
  const history = useHistory();
  const dispatch: AppThunkDispatch = useDispatch();
  const paymentAddress = useSelector(getPaymentAddressSelector);
  const { tokenId: tokenID } = useSelector(selectedPrivacyToken);

  const onShowQrCode = () => {
    history.push(QRCodeRoute, {
      title: "Payment Address",
      label: "This is your address. Use it to receive any cryptocurrency from another Incognito address.",
      value: paymentAddress,
    });
  };

  const navigateSendRoute = () => {
    batch(() => {
      dispatch(actionFreeData());
      dispatch(reset(FORM_CONFIGS.formName));
      // dispatch(actionSelectedPrivacySet({ tokenID: tokenID }));
    });
    setTimeout(() => {
      dispatch(actionFreeData());
      dispatch(reset(FORM_CONFIGS.formName));
    }, 1000);
    history.push(`${SendRoute}`);
  };

  return (
    <Styled>
      <Button title="Send" className="fs-regular" onClick={navigateSendRoute} />
      <Button title="Receive" className="fs-regular" onClick={onShowQrCode} />
    </Styled>
  );
});

export default ActionsGroup;
