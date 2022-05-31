import React from "react";
import styled, { ITheme } from "styled-components";
import QRCodeReact from "react-qr-code";

import Copy from "@components/Copy";

interface IProps {
  hook?: any;
  qrCodeProps: any;
  label?: string;
  copyProps?: any;
}

const Styled = styled.div`
  .copy-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    padding: 0 15px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .copy-block .btn-copy {
    height: 40px;
    border-radius: 40px;
    padding: 0 10px;
  }
  .copy-block p {
    max-width: 100%;
  }
  .label {
    text-align: center;
    background-color: black;
  }
  .qrcode-react {
    justify-content: center;
    display: flex;
    width: fit-content;
    padding: 15px;
    margin: auto;
    background: white;
    border-radius: 8px;
  }
`;

const QrCode = (props: IProps) => {
  const { hook, qrCodeProps, label, copyProps } = props;
  const { value } = qrCodeProps;
  return (
    <Styled className="qrcode-container">
      <div className="label fs-medium fw-bold ellipsis">{label}</div>
      <div className="qrcode-react">
        <QRCodeReact {...{ ...qrCodeProps, size: qrCodeProps?.size || 175 }} bgColor="transparent" />
      </div>
      {hook}
      <Copy text={value} {...copyProps} />
    </Styled>
  );
};

export default QrCode;
