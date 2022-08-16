import React from "react";
import styled, { ITheme } from "styled-components";
import { RadioButton } from "@components/RadioButton/RadioButton";

interface NetworkItemProps {
  title?: string;
  description?: string;
  onClick?: any;
  isSelected?: boolean;
}

const Styled = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 14px 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  .left-view {
    width: 40px;
    height: 40px;
    padding-top: 6.5px;
    justify-content: center;
    align-items: flex-start;
    display: flex;
  }
  .right-view {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    text-align: start;
  }
  .desc {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    text-align: start;
  }
`;

const NetworkItem: React.FC<NetworkItemProps> = (props: NetworkItemProps) => {
  const { title, description, onClick, isSelected = false } = props;
  return (
    <Styled className="hover-with-cursor" onClick={onClick}>
      <div className="left-view">
        <RadioButton isChecked={isSelected} />
      </div>
      <div className="right-view">
        <p className="title fs-regular fw-medium">{title}</p>
        <p className="desc fs-small fw-medium">{description}</p>
      </div>
    </Styled>
  );
};
export default NetworkItem;
