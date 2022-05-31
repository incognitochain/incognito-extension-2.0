import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import QrCode from "./QrCode";
import { CopyIcon, QrCodeIcon } from "../Icons";
import { actionToggleModal } from "@module/Modal";

const Styled = styled.div`
  .hook {
    border-radius: 11px;
    padding: 10px;
  }
  .hook > .sub-text {
    word-break: break-all;
  }
  .actions {
    justify-content: flex-end;
  }
`;

const QrCodeV2 = ({ title, desc }: { title: string; desc: string }) => {
  const dispatch = useDispatch();
  const handleShowQr = () =>
    dispatch(
      actionToggleModal({
        data: <QrCode label={title} qrCodeProps={{ value: desc }} />,
        title: " ",
        closeable: true,
      }),
    );
  return (
    <Styled className="m-b-30">
      <p className="fw-medium fs-medium ellipsis m-b-10">{title}</p>
      <div className="hook">
        <p className="sub-text m-b-10">{desc}</p>
        <div className="actions flex">
          <QrCodeIcon onClick={handleShowQr} />
          <CopyIcon text={desc} />
        </div>
      </div>
    </Styled>
  );
};

export default React.memo(QrCodeV2);
