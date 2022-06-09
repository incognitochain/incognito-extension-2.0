import React from "react";
import KeyChainItem, { IKeyChainItemProps } from "@module/Account/features/KeyChainItem/KeyChainItem";
import styled, { ITheme } from "styled-components";

const Styled = styled.div`
  .master-key-name {
    padding: 13px 16px;
    border-radius: 8px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  }
  .wrap-content {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

interface IProps {
  masterKeyName: string;
  listAccount: IKeyChainItemProps[];
  onSelectedItem: any;
}

const MasterKeyItem = React.memo((props: IProps) => {
  const { masterKeyName, listAccount, onSelectedItem } = props;

  const renderItem = (item: IKeyChainItemProps) => (
    <KeyChainItem {...item} onSelectedItem={onSelectedItem} key={item.address} />
  );

  return (
    <Styled>
      <p className="master-key-name sub-text fs-regular cursor">{masterKeyName}</p>
      <div className="wrap-content">{listAccount.map(renderItem)}</div>
    </Styled>
  );
});

export default MasterKeyItem;
