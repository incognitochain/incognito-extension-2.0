import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccountWithPaymentAddress } from "@redux/account/account.selectors";
import Header from "@components/Header";
import WrapContent from "@components/Content";
import { KeyChainDetailItem } from "@module/Account/features/KeychainDetail";

const parseShard = (bytes: any) => {
  const arr = bytes.split(",");
  const lastByte = arr[arr.length - 1];
  return (lastByte % 8).toString();
};

const KeychainDetailList = React.memo(() => {
  const location = useLocation();
  console.log(location);
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
      <Header title={headerName} />
      <WrapContent className="scroll-view no-padding">
        <KeyChainDetailItem title="Your incognito address" description={PaymentAddress} />
        <KeyChainDetailItem title="Private key" description={PrivateKey} />
        <KeyChainDetailItem title="Public key" description={PublicKeyCheckEncode} />
        <KeyChainDetailItem title="Readonly key" description={ReadonlyKey} />
        <KeyChainDetailItem title="Validator key" description={ValidatorKey} />
        <KeyChainDetailItem title="Validator Public key" description={BLSPublicKey} />
        <KeyChainDetailItem title="OTA key" description={OTAKey} />
        <KeyChainDetailItem title="ID" description={ID} />
        <KeyChainDetailItem title="Shard" description={(PublicKeyBytes && parseShard(PublicKeyBytes)) || ""} />
      </WrapContent>
    </>
  );
});

export default KeychainDetailList;
