import React from "react";
import styled from "styled-components";
import { ArrowLeftIcon } from "@components/Icons";
import withHeader, { IMergeProps } from "./Header.enhance";
import { BtnSelectAccount } from "@module/Account/features/SelectAccount";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding-left: 24px;
  padding-right: 24px;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    input {
      color: blue;
    }
  }

  .left a.header-title {
    margin-right: 10px;
    padding-left: 14px;
  }

  .right {
    margin-left: auto;
  }

  .refresh-container {
    height: 21px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
`;

const Header = (props: IMergeProps & any) => {
  const { rightHeader, selectAccount, handleClick, renderHeaderTitle, title }: IMergeProps = props;
  return (
    <Styled>
      {title && (
        <div className="left">
          <ArrowLeftIcon onClick={handleClick} />
          {renderHeaderTitle()}
        </div>
      )}
      <div className="right">
        {rightHeader}
        {selectAccount && <BtnSelectAccount />}
      </div>
    </Styled>
  );
};

export default withHeader(Header);