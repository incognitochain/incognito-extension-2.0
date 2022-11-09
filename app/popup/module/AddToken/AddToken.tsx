import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import withImport from "@module/AddToken/AddToken.enhance";
import TextInput from "@components/Inputs/TextInput";
import { TInner } from "@module/AddToken/AddToken.types";
import { Button, Image } from "@components/Core";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import PTokenModel from "@model/pTokenModel";
import { CONSTANT_CONFIGS } from "@constants/index";
const { PRVIDSTR } = require("incognito-chain-web-js/build/web/wallet");

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
  .open-explorer {
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colorP11};
    a {
      color: ${({ theme }) => theme.colorP10};
      :hover {
        opacity: 0.8;
      }
    }
  }
`;

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: #1a1c1e;
  padding: 8px 8px 0 8px;
  border-radius: 8px;
  max-height: 360px;
  overflow-y: scroll;

  .box-item {
    background-color: ${({ theme }) => theme.content};
    margin: 8px 0 16px 0;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }
  .logo {
    width: 24px;
    height: 24px;
  }
`;

interface IProps {
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchToken: () => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  tokens: PTokenModel[];
}

export interface IMergeProps extends TInner, IProps {}

function getIconUrl(symbol: string, tokenId: string, verified: boolean) {
  let uri;

  console.log("SANG TEST: ", { symbol, verified });
  if (tokenId === PRVIDSTR) {
    return "https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png";
  }
  if (!verified) return "";
  let formatedSymbol = String(symbol).toUpperCase();
  uri = `${CONSTANT_CONFIGS.CRYPTO_ICON_URL}/${formatedSymbol}.png`;
  return uri;
}

const AddToken = React.memo((props: IMergeProps) => {
  const { searchText, error, open, handleClose, onChangeInput, searchToken, tokens } = props;

  const renderItem = React.useCallback(() => {
    if (!tokens || tokens.length === 0) return null;
    return (tokens || []).map(({ name, network, tokenId, symbol, verified }) => {
      getIconUrl(symbol, tokenId, verified);
      return (
        <div key={tokenId} className="box-item hover">
          <Image className="logo noselect" iconUrl={getIconUrl(symbol, tokenId, true)} alt="logo-icon" />
          <div>
            <p className="fs-regular fw-regular">{name}</p>
            <p className="fs-small fw-small">{network}</p>
          </div>
        </div>
      );
    });
  }, [tokens]);

  return (
    <Styled>
      <Header title="Add Token" />
      <WrapContent paddingTop={true} className="default-padding-horizontal">
        <TextInput value={searchText || ""} onChange={onChangeInput} errorEnable={true} errorText={error} />
        <div className="open-explorer fs-small" onClick={() => {}}>
          Hint: the Token ID could be found by inputting token name or symbol into the search box on{" "}
          <a target="_blank" href="https://explorer.incognito.org/">
            Incognito Explorer.
          </a>
        </div>
        {/*{!!symbol && <TextInput value={symbol || ""} header="Token Symbol" disabled={true} />}*/}
        {/*{!!name && <TextInput value={name || ""} header="Token Name" disabled={true} />}*/}
        {/*{!!network && <TextInput value={network || ""} header="Network Name" disabled={true} />}*/}
        {/*{!!pDecimals && <TextInput value={pDecimals.toString() || ""} header="Token pDecimal" disabled={true} />}*/}
        {/*{!!contractID && <TextArea value={contractID || ""} header="Token Contract Address" disabled={true} rows={2} />}*/}
        <Button disabled={!searchText} title="Search token" className="btn-add-token" onClick={searchToken} />
      </WrapContent>
      <Modal
        // onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <BoxStyled>{renderItem()}</BoxStyled>
      </Modal>
    </Styled>
  );
});

export default withImport(AddToken);
