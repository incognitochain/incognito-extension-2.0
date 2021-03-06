import { AddButton } from "@components/AddButton/AddButton";
import { Paths } from "@components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { ellipsisCenter } from "@popup/utils";
import { useCallAsync } from "@popup/utils/notifications";
import { defaultAccountSelector, listAccountSelector } from "@redux/account/account.selectors";
import { trim } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { route as routeKeychainDetail } from "@module/Account/features/KeychainDetail";
import { AccountItem } from "@module/Account/features/SelectAccount";
import Header from "@components/Header";
import WrapContent from "@components/Content";

const SelectAccount = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();
  const { showLoading } = useLoading();
  const defaultAccount: any = useSelector(defaultAccountSelector);
  const listAccount = useSelector(listAccountSelector);
  const switchAccount = (accountItem: any) => {
    const accountName = accountItem.AccountName || accountItem.name;
    if (accountName && (accountName != defaultAccount.AccountName || accountName != defaultAccount?.name)) {
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
      state: { PaymentAddress: accountItem.PaymentAddress },
    });
  };

  return (
    <>
      <Header title="Keychain" rightHeader={<AddButton onClick={() => history.push(Paths.createAccountPage)} />} />
      <WrapContent className="default-padding-horizontal default-padding-top">
        {listAccount &&
          listAccount.map((accountItem) => {
            const name = accountItem.AccountName || accountItem.name;
            const paymentAddress = accountItem.paymentAddress;
            const isSelected = name == defaultAccount?.AccountName || name == defaultAccount?.name;
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
      </WrapContent>
    </>
  );
});

export default SelectAccount;
