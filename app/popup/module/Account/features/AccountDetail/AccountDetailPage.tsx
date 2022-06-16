import Header from "@components/BaseComponent/Header";
import BodyLayout from "@components/layout/BodyLayout";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import AccountDetailItem from "./AccountDetailItem/AccountDetailItem";
import { useSelector } from "react-redux";
import { getAccountWithPaymentAddress } from "@redux/account/account.selectors";

const parseShard = (bytes: any) => {
  const arr = bytes.split(",");
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

const AccountDetailPage = React.memo(() => {
  const history = useHistory();
  const location = useLocation();
  const PaymentAddressSelected = (location.state as any).PaymentAddress;
  if (!PaymentAddressSelected) return null;
  const selectedAccount = useSelector(getAccountWithPaymentAddress(PaymentAddressSelected));
  if (!selectedAccount) return null;
  const {
    AccountName,
    name,
    PaymentAddress = "",
    PrivateKey = "",
    PublicKeyCheckEncode = "",
    ReadonlyKey = "",
    ValidatorKey = "",
    BLSPublicKey = "",
    OTAKey = "",
    ID = "",
    PublicKeyBytes,
  } = selectedAccount as any;
  const headerName = `${AccountName || name || "Anon"}'s keys`;

  return (
    <>
      <Header title={headerName} onBackClick={() => history.goBack()} />
      <BodyLayout className="scroll-view no-padding">
        <AccountDetailItem title="Your incognito address" description={PaymentAddress} />
        <AccountDetailItem title="Private key" description={PrivateKey} />
        <AccountDetailItem title="Public key" description={PublicKeyCheckEncode} />
        <AccountDetailItem title="Readonly key" description={ReadonlyKey} />
        <AccountDetailItem title="Validator key" description={ValidatorKey} />
        <AccountDetailItem title="Validator Public key" description={BLSPublicKey} />
        <AccountDetailItem title="OTA key" description={OTAKey} />
        <AccountDetailItem title="ID" description={ID} />
        <AccountDetailItem title="Shard" description={(PublicKeyBytes && parseShard(PublicKeyBytes)) || ""} />
      </BodyLayout>
    </>
  );
});

export default AccountDetailPage;
