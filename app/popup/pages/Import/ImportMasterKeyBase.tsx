/* eslint-disable no-undef */
import { route as AssetsRoute } from "@module/Assets/Assets.route";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { ImportMasterKeyPage } from "@popup/pages/Import/ImportMasterKeyPage";
import { PasswordPage } from "@popup/pages/Password/PasswordPage";
import { useCallAsync } from "@popup/utils/notifications";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ImportMasterKeyRouteType } from "./ImportMasterKeyContext";
interface ImportMasterKeyBaseProps {
  mnemonic?: string;
  masterKeyName?: string;
}

const ImportMasterKeyBase: React.FC = () => {
  const history = useHistory();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const { showLoading } = useLoading();

  const [routePath, setRoutePath] = useState(Paths.passwordPage);

  const routeData = useRef<ImportMasterKeyRouteType & ImportMasterKeyBaseProps>({});

  const importWallet = async () => {
    showLoading(true);
    const { mnemonic = "", masterKeyName = "", password = "" } = routeData.current;
    callAsync(request("popup_importWallet", { mnemonic, masterKeyName, password }), {
      progress: { message: "Import wallet..." },
      success: { message: "Assets Imported" },
      onSuccess: (result: any) => {
        // history.push(Paths.homeRouteStack);
        showLoading(false);
        history.push(AssetsRoute);
      },
    });
  };

  const renderContent: ReactElement | any = useCallback(() => {
    switch (routePath) {
      case Paths.passwordPage:
        return (
          <PasswordPage
            headerTitle="Master key"
            onBack={() => {
              history.goBack();
            }}
            passwordInitValue={routeData.current.password}
            descriptionText="Create a password to protect this wallet and access your transaction history. For your eyes only; no one will be able to help you recover it. Keep it safe."
            buttonTitle="Continue"
            continuePressed={(password: string) => {
              routeData.current = { ...routeData.current, password };
              setRoutePath(Paths.importMasterKeyPage);
            }}
          />
        );

      case Paths.importMasterKeyPage:
        return (
          <ImportMasterKeyPage
            onBack={() => {
              setRoutePath(Paths.passwordPage);
            }}
            masterKeyName={routeData.current.masterKeyName}
            mnemonic={routeData.current.mnemonic}
            continueOnClick={(masterKeyName?: string, mnemonic?: string) => {
              routeData.current = { ...routeData.current, masterKeyName, mnemonic };
              importWallet();
            }}
          />
        );
      default:
        return null;
    }
  }, [routePath]);

  return renderContent();
};
export default ImportMasterKeyBase;
