/* eslint-disable no-undef */
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import ImportMasterKeyPage from "@popup/pages/Import/ImportMasterKeyPage";
import { PasswordPage } from "@popup/pages/Password/PasswordPage";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ImportMasterKeyRouteType } from "./ImportMasterKeyContext";
interface ImportMasterKeyBaseProps {
  mnemonic?: string;
  masterKeyName?: string;
}

const ImportMasterKeyBase: React.FC = () => {
  console.log("ImportMasterKeyBase");

  const history = useHistory();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const [routePath, setRoutePath] = useState(Paths.importMasterKeyPage);

  const routeData = useRef<ImportMasterKeyRouteType & ImportMasterKeyBaseProps>({});

  const importWallet = async () => {
    const { mnemonic = "", masterKeyName = "", password = "" } = routeData.current;
    callAsync(request("popup_importWallet", { mnemonic, masterKeyName, password }), {
      progress: { message: "Import wallet..." },
      success: { message: "Wallet Imported" },
      onSuccess: (result: any) => {
        console.log(" TO DO ");
        history.push(Paths.homeRouteStack);
      },
    });
  };

  const renderContent: ReactElement | any = useCallback(() => {
    console.log("routePath  TO DO ", routePath);

    switch (routePath) {
      case Paths.importMasterKeyPage:
        return (
          <ImportMasterKeyPage
            onBack={() => {
              history.goBack();
            }}
            masterKeyName={routeData.current.masterKeyName}
            mnemonic={routeData.current.mnemonic}
            continueOnClick={(masterKeyName?: string, mnemonic?: string) => {
              routeData.current = { ...routeData.current, masterKeyName, mnemonic };
              setRoutePath(Paths.passwordPage);
            }}
          />
        );
      case Paths.passwordPage:
        return (
          <PasswordPage
            onBack={() => {
              setRoutePath(Paths.importMasterKeyPage);
            }}
            buttonTitle="Import"
            continuePressed={(password: string) => {
              routeData.current = { ...routeData.current, password };
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
