import React from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "@components/Core";
import { Row } from "@popup/theme";
import { useModal } from "@module/Modal";

const Styled = styled.div`
  padding: 24px 16px;
  .sub-title {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.primaryP8};
  }
`;

interface IProps {
  onCancel?: () => void;
  onConfirm: () => void;
  title?: string;
  desc?: string;
  cancelTitle?: string;
  confirmTitle?: string;
}

const BoxScanCoin = React.memo((props: IProps) => {
  const { onCancel, onConfirm, title, desc, cancelTitle = "Cancel", confirmTitle = "Sure" } = props;

  const { closeModal } = useModal();

  const handleClose = () => closeModal && closeModal();

  const onCancelPress = async () => {
    if (onCancel) onCancel();
    handleClose();
  };

  const onConfirmPress = async () => {
    if (onConfirm) await onConfirm();
    handleClose();
  };

  return (
    <Styled>
      {title && <p className="label fs-supermedium fw-medium">{title}</p>}
      {desc && <p className="label fs-regular fw-medium sub-title">{desc}</p>}
      <Row>
        <SecondaryButton onClick={onCancelPress}>{cancelTitle}</SecondaryButton>
        <div style={{ width: 14 }} />
        <PrimaryButton onClick={onConfirmPress}>{confirmTitle}</PrimaryButton>
      </Row>
    </Styled>
  );
});

export default BoxScanCoin;
