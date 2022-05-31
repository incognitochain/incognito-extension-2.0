import React from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { Button } from "@components/Core";
import { ellipsisCenter } from "@popup/utils";

interface IProps {
  text: string;
  ellipsis?: boolean;
}
// background-color: ${(props: IGlobalStyle) => props.theme.copyButton};
// border: solid 0.5px ${(props: IGlobalStyle) => props.theme.copyBorderButton};

// color: ${(props: IGlobalStyle) => props.theme.copyTextButton};

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 20px;
  height: 40px;
  margin-top: 15px;
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
    margin-right: 1px;
    padding: unset;
    max-width: 60px;
  }
  .btn-copy-container {
    min-width: 70px;
    position: absolute;
    top: 1px;
    right: 0px;
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
    <Styled>
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
