import React from "react";
import styled, { ITheme } from "styled-components";
import { CopyIcon, QrCodeIcon } from "@components/Icons";
import { Row } from "@popup/theme";

const Styled = styled.div`
  padding: 8px 16px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 24px;
  justify-content: space-between;
  .icon {
    margin-left: 10px;
  }
`;

const AddressBar = React.memo(() => {
  const address = "s2usjsd4d822d...29skdffd4szd";
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
