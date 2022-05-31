import React from "react";
import styled, { ITheme } from "styled-components";
import { CopyIcon, QrCodeIcon } from "@components/Icons";
import { Row } from "@popup/theme";
import { ellipsisCenter } from "@popup/utils";
import { useSelector } from "react-redux";
import { paymentAddressOfDefaultAccountSelector } from "@redux/account/account.selectors";

const Styled = styled.div`
  padding: 8px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP8};
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
  const address = ellipsisCenter({
    str: useSelector(paymentAddressOfDefaultAccountSelector),
    limit: 12,
  });
  return (
    <Styled className="default-margin-horizontal">
      <p className="fs-regular fw-medium">{address}</p>
      <Row>
        <QrCodeIcon />
        <CopyIcon text={address} />
      </Row>
    </Styled>
  );
});

export default AddressBar;
