import React from "react";
import styled, { ITheme } from "styled-components";
import { ellipsisCenter } from "@popup/utils";

const Styled = styled.div`
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP10};
  border-radius: 8px;
  padding: 13px 16px;
  margin-top: 12px;
  .sub-content {
    margin-top: 4px;
  }
`;

export interface IKeyChainItemProps {
  name: string;
  address: string;
  onSelectedItem: any;
}

const KeyChainItem = React.memo((props: IKeyChainItemProps & any) => {
  const { name, address, onSelectedItem } = props;
  const ellipsisAddress = ellipsisCenter({ str: address, limit: 12 });
  return (
    <Styled className="cursor wrap-keychain" onClick={() => onSelectedItem({ address })}>
      <p className="fs-medium">{name}</p>
      <p className="fs-regular sub-content">{ellipsisAddress}</p>
    </Styled>
  );
});

export default KeyChainItem;
