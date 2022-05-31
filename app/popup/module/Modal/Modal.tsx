import React from "react";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import last from "lodash/last";
// import { themeSelector } from 'src/module/Setting';
// import { COLORS, IGlobalStyle } from 'src/styles';
import styled, { ITheme } from "styled-components";
import useOutsideRef from "@popup/hooks/useDetectClickOutside";
import enhance from "./Modal.enhance";
import { modalSelector } from "./Modal.selector";
import { IProps } from "./Modal.interface";
import Header from "@components/Header";

const Styled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  .modal-content-wrapper {
    position: absolute;
    padding: 30px;
    overflow: hidden;
  }
  .close-icon {
    z-index: 2;
    margin-left: auto;
    font-size: 14px;
  }
  .modal-loading-tx {
    position: relative;
    height: 100%;
  }
  .header {
    margin-top: 0;
  }
`;

// min-width: ${({ theme }: { theme: ITheme }) => theme.minWidth};
// max-width: ${({ theme }: { theme: ITheme }) => props.theme.maxWidth};
// width: ${(({ theme }: { theme: ITheme }) => props.theme.width};
// height: ${(({ theme }: { theme: ITheme }) => props.theme.height};
// background: ${(({ theme }: { theme: ITheme }) => theme.modalBg};

const Modal = (props: IProps) => {
  const modalState = useSelector(modalSelector);
  const { onClose } = props;
  const { data } = modalState;
  const lastModal = last(data);
  const ref: any = React.useRef({});
  const { closeable, data: modalData, customModalStyle, title, isLoadingModal, rightHeader } = lastModal || {};
  useOutsideRef(ref, closeable ? onClose : undefined);
  if (isEmpty(data) || isEmpty(lastModal)) {
    return null;
  }
  const renderModalContent = () => {
    if (isLoadingModal) {
      return (
        <div className="modal-content-wrapper linear-bg">
          <div className="flex modal-loading-tx">{modalData}</div>
        </div>
      );
    }
    return (
      <div className="modal-content-wrapper" ref={ref} style={customModalStyle}>
        {!!title && (
          <Header
            onGoBack={() => {
              if (closeable) {
                onClose();
              }
            }}
            title={title}
            rightHeader={rightHeader}
          />
        )}
        <div className="modal-data">{modalData}</div>
      </div>
    );
  };

  return <Styled className="modal-wrapper">{renderModalContent()}</Styled>;
};

export default enhance(React.memo(Modal));
