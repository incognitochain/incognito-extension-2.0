import React from "react";
import styled, { ITheme } from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Row } from "@popup/theme";
import { useSelector } from "react-redux";
import { followsTokenAssetsSelector } from "@module/Assets";
import Header from "@components/Header";
import WrapContent from "@components/Content/Content";
import withImport from "@module/AddToken/AddToken.enhance";
import TextInput from "@components/Inputs/TextInput";
import { TInner } from "@module/AddToken/AddToken.types";
import { Button, Image } from "@components/Core";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
    margin-top: 8px;
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
  width: 320px;
  background-color: #1a1c1e;
  padding: 8px 8px 0 8px;
  border-radius: 8px;
  max-height: 480px;
  overflow-y: scroll;

  .box-item {
    background-color: ${({ theme }) => theme.content};
    margin: 8px 0 16px 0;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
  }
  .logo {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  .token-name {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  }
  .network {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
  .verified {
    color: ${({ theme }: { theme: ITheme }) => theme.colorP2};
    width: 18px;
    height: 18px;
    margin-left: 6px;
  }
  .search-title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    margin-bottom: 12px;
  }
  .followed {
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    margin-left: 6px;
  }
`;

interface IProps {
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchToken: () => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  tokens: PTokenModel[];
  selectToken: (token: PTokenModel) => void;
}

export interface IMergeProps extends TInner, IProps {}

function getIconUrl(symbol: string, tokenId: string) {
  let uri;
  if (tokenId === PRVIDSTR) {
    return "https://statics.incognito.org/wallet/cryptocurrency-icons/32@2x/color/prv@2x.png";
  }
  let formatedSymbol = String(symbol).toUpperCase();
  uri = `${CONSTANT_CONFIGS.CRYPTO_ICON_URL}/${formatedSymbol}.png`;
  return uri;
}

const AddToken = React.memo((props: IMergeProps) => {
  const { searchText, error, open, handleClose, onChangeInput, searchToken, tokens, selectToken } = props;
  const followed = useSelector(followsTokenAssetsSelector);

  const renderItem = React.useCallback(() => {
    if (!tokens || tokens.length === 0) return null;
    return (tokens || []).map((token) => {
      const { name, network, tokenId, symbol, verified } = token;
      const isFollowed = followed.some(({ id }) => id === tokenId);
      return (
        <div key={tokenId} className="box-item hover" onClick={() => selectToken(token)}>
          <Image className="logo noselect" iconUrl={getIconUrl(symbol, tokenId)} alt="logo-icon" />
          <div style={{ flex: 1 }}>
            <Row style={{ alignItems: "center" }}>
              <p className="token-name fs-regular fw-regular">{name}</p>
              {verified && <CheckCircleIcon className="verified" />}
            </Row>
            <Row style={{ alignItems: "center" }}>
              <p className="network fs-small fw-small">{network}</p>
            </Row>
          </div>
          {isFollowed && <p className="followed fs-supersmall fw-small">Followed</p>}
        </div>
      );
    });
  }, [tokens]);

  return (
    <Styled>
      <Header title="Add Token" />
      <WrapContent paddingTop={true} className="default-padding-horizontal">
        <TextInput
          value={searchText || ""}
          onChange={onChangeInput}
          errorEnable={true}
          errorText={error}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchToken();
            }
          }}
          placeholder="Search token"
        />
        {/*<div className="open-explorer fs-small" onClick={() => {}}>*/}
        {/*  Hint: the Token ID could be found by inputting token name or symbol into the search box on{" "}*/}
        {/*  <a target="_blank" href="https://explorer.incognito.org/">*/}
        {/*    Incognito Explorer.*/}
        {/*  </a>*/}
        {/*</div>*/}
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
        <BoxStyled>
          {/*<p className="search-title fs-regular fw-regular">Search result for "{searchText}"</p>*/}
          {renderItem()}
        </BoxStyled>
      </Modal>
    </Styled>
  );
});

export default withImport(AddToken);
