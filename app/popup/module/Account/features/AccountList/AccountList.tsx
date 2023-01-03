import { route as routeKeychainDetail } from "@module/Account/features/KeychainDetail";
import AccountItem from "@module/Account/features/AccountList/AccountItem/AccountItem";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { ellipsisCenter } from "@popup/utils";
import { useCallAsync } from "@popup/utils/notifications";
import { getAccountDefaultNameSelector, getAccountListSelector } from "@redux-sync-storage/account/account.selectors";
import { trim } from "lodash";
import { useSnackbar } from "notistack";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, PrimaryButtonContaniner } from "./AccountList.styled";

const ledgerUSBVendorId = 11415;

const AccountList = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const { showLoading } = useLoading();
  const defaultAccountName: string = useSelector(getAccountDefaultNameSelector);
  const listAccount = useSelector(getAccountListSelector);

  const switchAccount = (accountItem: any) => {
    const accountName = accountItem.AccountName || accountItem.name;
    if (accountName && accountName != defaultAccountName) {
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

  console.log("");

  const connectHDWallet = () => {
    console.log("connectHDWallet TO DO ");
    showLoading({
      value: true,
    });
    const { hid } = navigator as any;

    callAsync(
      hid
        .getDevices()
        .then((deviceLst: any) => {
          deviceLst = deviceLst.filter((d: any) => d.vendorId === ledgerUSBVendorId);
          if (deviceLst?.length === 0) {
            return chrome.tabs.create({ url: chrome.runtime.getURL("assets/request-device.html") });
          } else {
            return Promise.all(deviceLst.map((d: any) => (d.opened ? d.close() : Promise.resolve(null))));
          }
        })
        .then((_: any) => request("popup_hdWalletConnect", { accountName: undefined })),
      {
        progress: { message: "Connect Hardware Wallet ..." },
        success: { message: "Done" },
        onSuccess: () => {
          showLoading({
            value: false,
          });
        },
        onError: (e) => {
          console.log("[connectHDWallet] ERROR: ", e);
          showLoading({
            value: false,
          });
        },
      },
    );
  };

  return (
    <Container className="default-padding-horizontal">
      {listAccount &&
        listAccount.map((accountItem: any) => {
          const name = accountItem.name;
          const paymentAddress = accountItem.paymentAddress;
          const isSelected = name == defaultAccountName;
          const paymentAddressEllipsis = ellipsisCenter({
            str: paymentAddress || "",
            limit: 13,
          });
          return (
            <AccountItem
              key={paymentAddress}
              isSelected={isSelected}
              accountName={name}
              paymentAddress={paymentAddressEllipsis}
              onClick={() => accountItemOnClick(accountItem)}
              checkBoxOnClick={() => switchAccount(accountItem)}
            />
          );
        })}
      <PrimaryButtonContaniner onClick={connectHDWallet}>{"HD Wallet"}</PrimaryButtonContaniner>
    </Container>
  );
};

export default memo(AccountList);
