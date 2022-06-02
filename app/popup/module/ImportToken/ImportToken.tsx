import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import withImport from "@module/ImportToken/ImportToken.enhance";
import TextInput from "@components/Inputs/TextInput";
import { TInner } from "@module/ImportToken/ImportToken.types";
import { Button } from "@components/Core";

const Styled = styled.div`
  input {
    padding-right: 16px;
  }
  * + .input-container {
    margin-top: 24px;
  }

  .btn-add-token {
    margin-top: 34px;
  }
`;

interface IProps {
  onChangeTokenID: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IMergeProps extends TInner, IProps {}

const ImportToken = React.memo((props: IMergeProps) => {
  const { tokenID, symbol, network, name, contractID, error, onChangeTokenID } = props;
  return (
    <Styled>
      <Header title="Import Tokens" />
      <WrapContent paddingTop={true} className="default-padding-horizontal">
        <TextInput
          value={tokenID || ""}
          header="Token ID Address"
          onChange={onChangeTokenID}
          errorEnable={true}
          multiple={true}
          errorText={error}
        />
        {symbol && <TextInput value={symbol || ""} header="Token Symbol" disabled={true} />}
        {name && <TextInput value={name || ""} header="Token Name" disabled={true} />}
        {network && <TextInput value={network || ""} header="Network Name" disabled={true} />}
        {contractID && (
          <TextInput value={contractID || ""} header="Token Contract Address" disabled={true} multiple={true} />
        )}
        <Button title="Add Token" className="btn-add-token" />
      </WrapContent>
    </Styled>
  );
});

export default withImport(ImportToken);
