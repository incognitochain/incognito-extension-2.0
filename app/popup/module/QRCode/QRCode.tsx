import React from "react";
import styled, { ITheme } from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import { IRouteState } from "@module/QRCode";
import QrCodeModal from "@components/QrCodeModal";
import { useLocation } from "react-router";

const Styled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }: { theme: ITheme }) => theme.body};
  .content-wrapper {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .close-icon {
    z-index: 2;
    margin-left: auto;
    font-size: 14px;
  }
  .header {
    margin-top: 0;
  }
  .modal-data {
    flex: 1;
  }
  .wrap-content {
    padding-top: 24px;
  }
  .label {
    margin-bottom: 30px;
    text-align: center;
  }
`;

const QRCode = () => {
  const { state }: { state: IRouteState } = useLocation();
  const { title, onClose, value, label } = state || {};
  const renderModalContent = () => {
    return (
      <div className="content-wrapper">
        {!!title && <Header onGoBack={onClose} title={title} />}
        <WrapContent>
          <div className="modal-data">
            <QrCodeModal label={label} value={value} key="AddressBar" />
          </div>
        </WrapContent>
      </div>
    );
  };

  return <Styled className="modal-wrapper">{renderModalContent()}</Styled>;
};

export default React.memo(QRCode);
