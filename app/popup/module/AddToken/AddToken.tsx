import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import withImport from "@module/AddToken/AddToken.enhance";
import TextInput from "@components/Inputs/TextInput";
import { TInner } from "@module/AddToken/AddToken.types";
import { Button } from "@components/Core";
import TextArea from "@components/Inputs/TextArea";

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
  onChangeTokenID: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddToken: () => void;
}

export interface IMergeProps extends TInner, IProps {}

const AddToken = React.memo((props: IMergeProps) => {
  const { tokenID, symbol, network, name, contractID, pDecimals, error, onChangeTokenID, onAddToken } = props;
  console.log(pDecimals);
  return (
    <Styled>
      <Header title="Add Token" />
      <WrapContent paddingTop={true} className="default-padding-horizontal">
        <TextArea
          value={tokenID || ""}
          header="Token ID"
          onChange={onChangeTokenID}
          errorEnable={true}
          errorText={error}
        />
        {!!symbol && <TextInput value={symbol || ""} header="Token Symbol" disabled={true} />}
        {!!name && <TextInput value={name || ""} header="Token Name" disabled={true} />}
        {!!network && <TextInput value={network || ""} header="Network Name" disabled={true} />}
        {!!pDecimals && <TextInput value={pDecimals.toString() || ""} header="Token pDecimal" disabled={true} />}
        {!!contractID && <TextArea value={contractID || ""} header="Token Contract Address" disabled={true} rows={2} />}
        <Button disabled={!!error || !symbol} title="Add Token" className="btn-add-token" onClick={onAddToken} />
      </WrapContent>
    </Styled>
  );
});

export default withImport(AddToken);
