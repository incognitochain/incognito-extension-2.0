import React from "react";
import styled, { ITheme } from "styled-components";
import { ellipsisCenter } from "@popup/utils";
import { CopyIcon } from "@components/Icons";

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
    position: absolute;
    right: 15px;
  }
`;

const Copy: React.FunctionComponent<IProps> = (props) => {
  const { text, ellipsis = true } = props;
  return (
    <Styled className="default-margin-horizontal">
      <p className={`text ${!ellipsis ? "ellipsis" : ""}`}>
        {ellipsis ? ellipsisCenter({ str: text, limit: 14 }) : text}{" "}
      </p>
      <div className="btn-copy-container">
        <CopyIcon text={text} />
      </div>
    </Styled>
  );
};

export default Copy;
