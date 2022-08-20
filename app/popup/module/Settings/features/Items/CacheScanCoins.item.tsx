import NetworkIcon from "@components/Icons/NetworkIcon";
import RightArrowIcon from "@components/Icons/RightArrowIcon";
import React from "react";
import { SettingItem } from "@module/Settings";
import { useModal } from "@module/Modal";
import ConfirmBox from "@module/Modal/features/ConfirmBox/ConfirmBox";
import { useDispatch, useSelector } from "react-redux";
import { defaultAccountWalletSelector, keyDefineAccountSelector } from "@redux/account/account.selectors";
import { Paths } from "@components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";
import { AppThunkDispatch } from "@redux/store";
import { actionReScanCoins } from "@redux-sync-storage/scanCoins";
import { actionLogout } from "@redux/account";

const CacheScanCoins: React.FC = () => {
  const { setModal } = useModal();
  const { showLoading } = useLoading();
  // const accountSender = useSelector(defaultAccountWalletSelector);
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const dispatch: AppThunkDispatch = useDispatch();
  // const keyDefine = useSelector(keyDefineAccountSelector);

  const clearStorageScanCoins = () => {
    try {
      // const otaKey = accountSender.getOTAKey();
      // if (!otaKey || !keyDefine) return;
      showLoading({ value: true });
      callAsync(request("popup_lockWallet", {}), {
        progress: { message: "locking wallet..." },
        success: { message: "Wallet locked" },
        onSuccess: () => {
          dispatch(actionLogout());
          setTimeout(async () => {
            // await accountSender.clearStorageCoinsScan();
            // dispatch(actionReScanCoins({ keyDefine }));
            history.push(Paths.unlockPage);
            showLoading({ value: false });
          }, 3000);
        },
      });
    } catch (e) {
      showLoading({ value: false });
    }
  };

  const showConfirm = () => {
    setModal({
      data: <ConfirmBox onConfirm={clearStorageScanCoins} title="Rescan coins" desc="Clear storage coins and rescan" />,
      title: "",
      isTransparent: true,
      closable: true,
    });
  };

  return (
    <SettingItem
      onClick={showConfirm}
      leftView={<NetworkIcon />}
      title="Rescan coins"
      description="Clear storage coins and rescan"
      rightView={<RightArrowIcon />}
    />
  );
};
export default CacheScanCoins;
