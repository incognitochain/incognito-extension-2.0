import { AddButton } from "@components/AddButton/AddButton";
import { Paths } from "@components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { ellipsisCenter } from "@popup/utils";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { route as routeKeychainDetail } from "@module/Account/features/KeychainDetail";
import { AccountItem } from "@module/Account/features/SelectAccount";
import Header from "@components/Header";
import WrapContent from "@components/Content";
import { getAccountListSelector, getAccountDefaultNameSelector } from "@redux-sync-storage/account/account.selectors";
import { PrimaryButtonContaniner } from "./SelectAccount.styled";
import { HARDWARE_DEVICE_EMULATOR } from "@constants/config";

const ledgerUSBVendorId = 11415

const SelectAccount = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const { showLoading } = useLoading();
  const defaultAccountName: string = useSelector(getAccountDefaultNameSelector);
  const listAccount = useSelector(getAccountListSelector);

  const switchAccount = (accountItem: any) => {
    const accountName = accountItem.AccountName || accountItem.name;
    if (accountName && (accountName != defaultAccountName || accountName != defaultAccountName)) {
      showLoading({
        value: true,
      });
      callAsync(request("popup_switchAccount", { accountName: trim(accountName) }), {
        progress: { message: "Switching Account..." },
        success: { message: "Switch Done" },
        onSuccess: () => {
          showLoading({
            value: false,
          });
          history.goBack();
        },
      });
    } else {
      // history.goBack();
      enqueueSnackbar(`Your cuurent keychain is ${accountName}`, { variant: "warning" });
    }
  };

  const accountItemOnClick = (accountItem: any) => {
    history.push({
      pathname: routeKeychainDetail,
      state: { PaymentAddress: accountItem.paymentAddress },
    });
  };

  const connectHardwareWallet = () => {
    console.log("connectHardwareWallet TO DO ");
    showLoading({
      value: true,
    });
    const { hid } = navigator as any;
    
    callAsync(hid.getDevices().then((deviceLst: any) => {
      deviceLst = deviceLst.filter((d: any) => d.vendorId === ledgerUSBVendorId);
      if (deviceLst?.length === 0) {
        if (HARDWARE_DEVICE_EMULATOR) return;
        return chrome.tabs.create({ url: chrome.runtime.getURL("assets/request-device.html") });
      } else {
        return Promise.all(deviceLst.map((d: any) => d.opened ? d.close() : Promise.resolve(null)));
      }
    }).then((_: any) => request("popup_hardwareWalletConnect", { accountName: undefined })), {
      progress: { message: "Connect Hardware Wallet ..." },
      success: { message: "Done" },
      onSuccess: () => {
        showLoading({
          value: false,
        });
      },
      onError: (e) => {
        console.log("[connectHardwareWallet] ERROR: ", e);
        showLoading({
          value: false,
        });
      },
    });
  };

  return (
    <>
      <Header title="Keychain" rightHeader={<AddButton onClick={() => history.push(Paths.createAccountPage)} />} />
      <WrapContent className="default-padding-horizontal default-padding-top">
        {listAccount &&
          listAccount.map((accountItem) => {
            const name = accountItem.name;
            const paymentAddress = accountItem.paymentAddress;
            const isSelected = name == defaultAccountName || name == defaultAccountName;
            const paymentAddressEllipsis = ellipsisCenter({
              str: paymentAddress || "",
              limit: 13,
            });
            return (
              <AccountItem
                key={paymentAddress}
                isSelected={isSelected}
                title={name}
                description={paymentAddressEllipsis}
                onClick={() => accountItemOnClick(accountItem)}
                radioBtnOnClick={() => switchAccount(accountItem)}
              />
            );
          })}
        <PrimaryButtonContaniner onClick={connectHardwareWallet}>{"Connect Hardware Wallet"}</PrimaryButtonContaniner>
      </WrapContent>
    </>
  );
});

export default SelectAccount;
