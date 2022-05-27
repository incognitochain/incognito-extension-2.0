import React from "react";
import styled, { ITheme } from "styled-components";
// import { BtnSelectAccount } from "@module/Account/features/SelectAccount";
import { ArrowLeftIcon } from "@components/Icons";
import withHeader, { IMergeProps } from "./Header.enhance";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 30px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    input {
    }
  }

  .left p.header-title {
    margin-right: 10px;
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
    <Styled className="header">
      {title && (
        <div className="left">
          <ArrowLeftIcon onClick={handleClick} />
          {renderHeaderTitle()}
        </div>
      )}
      <div className="right">
        {rightHeader}
        {/*{selectAccount && <BtnSelectAccount />}*/}
      </div>
    </Styled>
  );
};

export default withHeader(Header);
