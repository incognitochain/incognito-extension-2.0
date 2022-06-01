import React from "react";
import styled, { ITheme } from "styled-components";
import copy from "copy-to-clipboard";
import { Button } from "@components/Core";
import { ellipsisCenter } from "@popup/utils";

interface IProps {
  text: string;
  ellipsis?: boolean;
}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;
  height: 50px;
  margin-top: 24px;
  position: relative;
  .text {
    margin-right: 15px;
    padding-left: 15px;
    &.ellipsis {
      max-width: calc(100% - 70px);
    }
  }
  .btn-container {
    height: 36px;
    padding: unset;
    max-width: 60px;
  }
  .btn-copy-container {
    min-width: 70px;
    position: absolute;
    right: 15px;
    border-radius: 8px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.colorP3};
  }
`;

const Copy: React.FunctionComponent<IProps> = (props) => {
  const { text, ellipsis = true } = props;
  const [copied, setCopied] = React.useState(false);
  const handleCopyData = (e: any) => {
    try {
      e.preventDefault();
      copy(text);
      setCopied(true);
    } catch (error) {
      console.debug(error);
    }
  };
  return (
    <Styled className="default-margin-horizontal">
      <p className={`text ${!ellipsis ? "ellipsis" : ""}`}>
        {ellipsis ? ellipsisCenter({ str: text, limit: 11 }) : text}{" "}
      </p>
      <div className="btn-copy-container">
        <Button title={copied ? `Copied` : `Copy`} onClick={handleCopyData} />
      </div>
    </Styled>
  );
};

export default Copy;
