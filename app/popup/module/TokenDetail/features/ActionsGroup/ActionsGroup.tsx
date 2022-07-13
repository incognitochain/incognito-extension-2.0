import React from "react";
import styled, { ITheme } from "styled-components";
import { Button } from "@components/Core";
import { useHistory } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { paymentAddressOfDefaultAccountSelector } from "@redux/account/account.selectors";
import { route as QRCodeRoute } from "@module/QRCode";
import { actionFreeData, FORM_CONFIGS, route as SendRoute } from "@module/Send";
import { actionSelectedPrivacySet, selectedPrivacyToken } from "@redux/selectedPrivacy";
import { AppThunkDispatch } from "@redux/store";
import { reset } from "redux-form";

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
  const paymentAddress = useSelector(paymentAddressOfDefaultAccountSelector);
  const { tokenId: tokenID } = useSelector(selectedPrivacyToken);

  const onShowQrCode = () => {
    history.push(QRCodeRoute, {
      title: "Payment Address",
      label: "This is your address. Use it to receive any cryptocurrency from another Incognito address.",
      value: paymentAddress,
    });
  };

  const navigateSendRoute = () => {
    history.push(`${SendRoute}`);
    batch(() => {
      dispatch(actionFreeData());
      dispatch(reset(FORM_CONFIGS.formName));
      dispatch(actionSelectedPrivacySet({ tokenID: tokenID }));
    });
  };

  return (
    <Styled>
      <Button title="Send" className="fs-regular" onClick={navigateSendRoute} />
      <Button title="Receive" className="fs-regular" onClick={onShowQrCode} />
    </Styled>
  );
});

export default ActionsGroup;
