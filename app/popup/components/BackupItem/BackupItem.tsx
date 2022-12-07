import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import styled, { ITheme } from "styled-components";
import { route } from "@module/QRCode/QRCode.route";
import { CopyIcon, QrCodeIcon } from "../Icons";
import SpaceView from "@popup/components/SpaceView/SpaceView";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .top-view {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
  }
  .top-left-view {
    display: flex;
    flex: 1;
  }

  .top-right-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .bottom-view {
    margin-top: 5px;
    padding-left: 24px;
    padding-right: 24px;

    .content-text {
      color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  .break-line {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP11};
  }
`;

type Props = {
  title?: string;
  content?: string;
};

const BackupItem = (props: Props) => {
  const { title = "", content = "" } = props;
  const history = useHistory();

  const qrCodeIconOnClick = () => {
    history.push(route, {
      title: title,
      label: "",
      value: content,
    });
  };

  return (
    <Container>
      <div className="top-view">
        <div className="top-left-view ">
          <p className="fw-medium fs-regular">{title}</p>
        </div>
        <div className="top-right-view">
          <QrCodeIcon onClick={qrCodeIconOnClick} />
          <SpaceView width={20} />
          <CopyIcon text={content} />
        </div>
      </div>
      <div className="bottom-view">
        <p className="fw-regular fs-small content-text">{content}</p>
      </div>
      <div className="break-line"></div>
    </Container>
  );
};

export default memo(BackupItem);
