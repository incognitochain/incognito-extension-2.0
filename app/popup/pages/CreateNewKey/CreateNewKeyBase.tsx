import { withLayout } from "@/popup/components/layout";
import { Paths } from "@/popup/components/routes/paths";
import React, { ReactElement, useMemo, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { MasterKeyPharsePage } from "../MasterKey/MasterKeyPage";
import { MasterKeyPharseConfirmPage } from "../MasterKeyConfirm/MasterKeyPharseConfirm";
import { MasterKeyPharseCreatedPage } from "../MaterKeyCreated/MasterKeyPharseCreated";
import { CreateNewKeyContext } from "./CreateNewKeyContext";
import CreateNewKeyPage from "./CreateNewKeyPage";

const CreateNewKeyBase: React.FC = () => {
  const history = useHistory();

  const [routePath, setRoutePath] = useState(Paths.createNewKeyPage);
  const [phraseList, setPhraseList] = useState<string[]>([]);

  const routeData = useRef<any>({});

  const renderContent: ReactElement | any = useMemo(() => {
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
      {renderContent}
    </CreateNewKeyContext.Provider>
  );
};
export default withLayout(CreateNewKeyBase);
