import React from "react";
import styled, { ITheme } from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import WrapContent from "@components/Content/Content";
import { ArrowCircleIcon, AskIcon } from "@components/Icons";
import { Extra, ActionsGroup } from "@module/TokenDetail/features";
import { useHistory } from "react-router-dom";
import { route as routeWallet } from "@module/Assets/Assets.route";
import { TxsHistory } from "@module/TokenDetail/features/TxsHistory";
import { compose } from "recompose";
import withBalance from "@module/MainRoute/MainRoute.withBalance";
import { sleep } from "@popup/utils/utils";
import { route } from "@module/TokenDetail/features/TokenInfo";
import LoadingContainer from "@components/LoadingContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import { Row } from "@popup/theme";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";

const Styled = styled.div`
  height: 100%;
  .wrap-content {
    flex-direction: column;
  }
`;

const BinButton = styled.button`
  padding: 8px;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 8px;
  .bin-icon {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    width: 24px;
    height: 24px;
  }
`;

const TokenDetail = React.memo((props: any) => {
  const { loadFollowTokensBalance } = props;
  const tokenSelected = useSelector(selectedPrivacyToken);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const historyRef = React.useRef<any>(null);
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [initing, setIniting] = React.useState(true);
  const onReload = async () => {
    try {
      if (isLoading || !historyRef.current) return;
      setIsLoading(true);
      await Promise.all([loadFollowTokensBalance(), historyRef.current.reloadHistory(), sleep(1000)]);
    } catch (e) {
      // Ignore Error
    } finally {
      setIsLoading(false);
    }
  };

  const navTokenInfo = () => history.push(route);

  React.useEffect(() => {
    setTimeout(() => {
      setIniting(false);
    }, 300);
  }, []);

  if (initing) return <LoadingContainer />;

  return (
    <Styled>
      <Header
        onGoBack={() => history.push(routeWallet)}
        customHeader={<AskIcon onClick={navTokenInfo} />}
        rightHeader={
          <Row>
            <BinButton
              className="hover"
              onClick={() => {
                history.goBack();
                setTimeout(async () => {
                  try {
                    showLoading({
                      value: true,
                    });
                    await callAsync(request("popup_removeFollowToken", { tokenID: tokenSelected.tokenId }), {
                      onSuccess: (result: any) => {},
                      onError: (error) => {
                        console.log("onAddToken ERROR: ", error);
                      },
                      onFinish: () => {
                        showLoading({ value: false });
                        console.log("onAddToken FINISH: ");
                      },
                    });
                  } catch (e) {
                    console.log("onAddToken ERROR: ");
                  }
                }, 200);
              }}
            >
              <DeleteIcon className="bin-icon" />
            </BinButton>
            <ArrowCircleIcon className="hover" onClick={onReload} isLoading={isLoading} />
          </Row>
        }
        title={tokenSelected.symbol}
      />
      <WrapContent>
        <Extra />
        <ActionsGroup />
        <TxsHistory ref={historyRef} />
      </WrapContent>
    </Styled>
  );
});

export default compose(withBalance)(TokenDetail);
