import React from "react";
import styled, { ITheme } from "styled-components";
import { CopyIcon, QrCodeIcon } from "@components/Icons";
import { Row } from "@popup/theme";
import { ellipsisCenter } from "@popup/utils";
import { useSelector } from "react-redux";
// import { paymentAddressOfDefaultAccountSelector } from "@redux/account/account.selectors";
import { useHistory } from "react-router-dom";
import { route as QRCodeRoute } from "@module/QRCode";
import { getPaymentAddress } from "@redux-sync-storage/account/account.selectors";

const Styled = styled.div`
  padding: 8px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP10};
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 24px;
  justify-content: space-between;
  .copy-icon {
    margin-left: 10px;
  }
  p {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
`;

const AddressBar = React.memo(() => {
  const history = useHistory();
  // const paymentAddress = useSelector(paymentAddressOfDefaultAccountSelector);
  const paymentAddress = useSelector(getPaymentAddress);
  const addressEllipsis = ellipsisCenter({
    str: paymentAddress,
    limit: 11,
  });

  const onShowQrCode = () => {
    history.push(QRCodeRoute, {
      title: "Payment Address",
      label: "This is your address. Use it to receive any cryptocurrency from another Incognito address.",
      value: paymentAddress,
    });
  };

  return (
    <Styled className="default-margin-horizontal">
      <p className="fs-regular fw-medium">{addressEllipsis}</p>
      <Row>
        <QrCodeIcon onClick={onShowQrCode} />
        <CopyIcon text={paymentAddress} />
      </Row>
    </Styled>
  );
});

export default AddressBar;
