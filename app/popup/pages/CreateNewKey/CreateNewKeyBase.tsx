/* eslint-disable no-undef */
import { route as AssetsRoute } from "@module/Assets/Assets.route";
import { withLayout } from "@popup/components/layout";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { MasterKeyPharsePage } from "@popup/pages/MasterKey/MasterKeyPage";
import { MasterKeyPharseConfirmPage } from "@popup/pages/MasterKeyConfirm/MasterKeyPharseConfirm";
import { MasterKeyPharseCreatedPage } from "@popup/pages/MasterKeyCreated/MasterKeyPharseCreated";
import { PasswordPage } from "@popup/pages/Password/PasswordPage";
import { useCallAsync } from "@popup/utils/notifications";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateNewKeyContext, CreateNewKeyRouteContextType } from "./CreateNewKeyContext";
import { CreateNewKeyPage } from "./CreateNewKeyPage";
import { getEnvironmentType } from "@popup/context/background";
import { ENVIRONMENT_TYPE_NOTIFICATION } from "@core/types";
interface RouteDataProps {
  mnemonic?: string;
  masterKeyName?: string;
  password?: string;
}

const CreateNewKeyBase: React.FC = () => {
  const history = useHistory();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const { showLoading } = useLoading();

  const [routePath, setRoutePath] = useState(Paths.createNewKeyPage);
  const [phraseList, setPhraseList] = useState<string[]>([]);

  const routeData = useRef<CreateNewKeyRouteContextType & RouteDataProps>({});

  const createMasterKey = async () => {
    const { mnemonic = "", masterKeyName = "", password = "" } = routeData.current;
    showLoading({
      value: true,
    });
    callAsync(request("popup_createWallet", { mnemonic, masterKeyName, password }), {
      progress: { message: "Creating wallet..." },
      success: { message: "Wallet created" },
      onSuccess: (result) => {
        if (getEnvironmentType() === ENVIRONMENT_TYPE_NOTIFICATION) {
          window.close();
        } else {
          showLoading({
            value: false,
          });
          history.push(AssetsRoute);
        }
      },
    });
  };

  const renderContent: ReactElement | any = useCallback(() => {
    switch (routePath) {
      case Paths.createNewKeyPage:
        return (
          <CreateNewKeyPage
            onBack={() => {
              history.goBack();
            }}
            masterKeyName={routeData.current.masterKeyName}
            checkBoxAccept={routeData.current.checkBoxAccept}
            onReadyClick={(masterKeyName?: string, checkBoxAccept?: boolean) => {
              routeData.current = { ...routeData.current, masterKeyName, checkBoxAccept };
              setRoutePath(Paths.masterKeyPhrasePage);
            }}
          />
        );
      case Paths.masterKeyPhrasePage:
        return (
          <MasterKeyPharsePage
            masterKeyName={routeData.current.masterKeyName}
            phraseList={routeData.current.phraseList}
            onBack={() => {
              setRoutePath(Paths.createNewKeyPage);
            }}
            saveMyPhraseOnClick={(mnemonic: string, phraseList: string[]) => {
              routeData.current = { ...routeData.current, mnemonic, phraseList };
              setRoutePath(Paths.masterKeyPhraseConfirmPage);
            }}
          />
        );
      case Paths.masterKeyPhraseConfirmPage:
        return (
          <MasterKeyPharseConfirmPage
            phraseList={routeData.current.phraseList}
            onBack={() => {
              setRoutePath(Paths.masterKeyPhrasePage);
            }}
            createMasterKeySucess={() => {
              setRoutePath(Paths.masterKeyPhraseCreatedPage);
            }}
            continueOnPress={() => {
              setRoutePath(Paths.passwordPage);
            }}
          />
        );
      case Paths.passwordPage:
        return (
          <PasswordPage
            headerTitle="Create Password"
            onBack={() => {
              setRoutePath(Paths.masterKeyPhraseConfirmPage);
            }}
            descriptionText=""
            buttonTitle="Create Master Key"
            continuePressed={(password: string) => {
              routeData.current = { ...routeData.current, password };
              createMasterKey();
            }}
          />
        );

      case Paths.masterKeyPhraseCreatedPage:
        return (
          <MasterKeyPharseCreatedPage
            onContinue={() => {
              alert("comming soon");
            }}
          />
        );
      default:
        return null;
    }
  }, [routePath]);

  return (
    <CreateNewKeyContext.Provider
      value={{
        setRoutePath,
        phraseList,
        setPhraseList,
      }}
    >
      {renderContent()}
    </CreateNewKeyContext.Provider>
  );
};
export default withLayout(CreateNewKeyBase);
