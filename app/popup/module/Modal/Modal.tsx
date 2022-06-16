import React, { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import last from "lodash/last";
import styled, { ITheme } from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import useOutsideRef from "@popup/hooks/useDetectClickOutside";
import { isArray } from "lodash";

const Styled = styled.div<{ isTransparent: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isTransparent }: { theme: ITheme; isTransparent: boolean }) =>
    isTransparent ? `rgb(25, 25, 25, 0.8)` : theme.body};
  .modal-content-wrapper {
    position: absolute;
    overflow: hidden;
    margin: auto;
    width: 90%;
    background-color: ${({ theme }: { theme: ITheme }) => theme.content};
    border-radius: 8px;
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
  .modal-data {
    flex: 1;
  }
  .wrap-content {
    padding-top: 24px;
  }
  .label {
    margin-bottom: 8px;
    text-align: center;
  }
`;

export interface IProps {
  modalState: SetModalProps[];
  closeModal: any;
}

const Modal = (props: IProps) => {
  const { modalState, closeModal } = props;
  const lastModal = last(modalState);
  const ref: any = React.useRef({});
  const { data: modalData, title, rightHeader, isTransparent, closable } = lastModal || {};
  useOutsideRef(ref, closable ? closeModal : undefined);
  if (isEmpty(lastModal)) {
    return null;
  }

  const renderModalContent = () => {
    if (isTransparent) {
      return (
        <>
          <div className="modal-content-wrapper" ref={ref}>
            {modalData}
          </div>
        </>
      );
    }
    return (
      <div className="modal-content-wrapper" ref={ref}>
        {!!title && <Header onGoBack={closeModal} title={title} rightHeader={rightHeader} />}
        <WrapContent>{modalData}</WrapContent>
      </div>
    );
  };

  return (
    <Styled isTransparent={!!isTransparent} className="modal-wrapper">
      {renderModalContent()}
    </Styled>
  );
};

interface SetModalProps {
  data: React.ReactNode;
  title?: string;
  rightHeader?: React.ReactNode;
  isTransparent: boolean;
  closable?: boolean;
}
interface LoadingContextType {
  setModal: (_: SetModalProps) => void;
  clearAllModal: () => void;
  closeModal: () => void;
}
const ModalContextInit = {
  setModal: () => {},
  clearAllModal: () => {},
  closeModal: () => {},
};

const ModalContext = React.createContext<LoadingContextType>(ModalContextInit);

export function ModalProvider(props: React.PropsWithChildren<{}>) {
  const [modalProps, setModal] = React.useState<SetModalProps[]>([]);
  const children = React.useMemo(() => props.children, []);

  const appendModal = (modal: SetModalProps) => {
    if (!modal.data) return;
    setModal((value) => {
      if (value && !isArray(value)) {
        return [value, modal];
      }
      return (value || []).concat([modal]);
    });
  };

  const clearAllModal = () => {
    setModal([]);
  };

  const onCloseModal = () =>
    setModal((value: any) => {
      return value.pop() || [];
    });

  return (
    <ModalContext.Provider
      value={{
        setModal: appendModal,
        clearAllModal,
        closeModal: onCloseModal,
      }}
    >
      <>{children}</>
      {modalProps && <Modal modalState={modalProps} closeModal={onCloseModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = (): LoadingContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal not found, useModal must be used within the <ModalProvider>..</ModalProvider>");
  }
  return context;
};
