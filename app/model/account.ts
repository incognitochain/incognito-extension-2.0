interface IAccount {
  name?: string | undefined;
  value?: string | undefined;
  PaymentAddress?: string | undefined;
  ReadonlyKey?: string | undefined;
  PrivateKey?: string | undefined;
  PublicKey?: string | undefined;
  PublicKeyCheckEncode?: string | undefined;
  PublicKeyBytes?: string | undefined;
  BLSPublicKey?: string | undefined;
  ValidatorKey?: string | undefined;
  OTAKey?: string | undefined;
  PaymentAddressV1?: string | undefined;
  ID?: string | undefined;
  AccountName?: string | undefined;
}

class Account {
  name?: string | undefined;
  value?: string | undefined;
  PaymentAddress?: string | undefined;
  ReadonlyKey?: string | undefined;
  PrivateKey?: string | undefined;
  PublicKey?: string | undefined;
  PublicKeyCheckEncode?: string | undefined;
  PublicKeyBytes?: string | undefined;
  BLSPublicKey?: string | undefined;
  ValidatorKey?: string | undefined;
  OTAKey?: string | undefined;
  PaymentAddressV1?: string | undefined;
  ID?: string | undefined;
  accountName?: string | undefined;
  AccountName?: string | undefined;

  constructor(data: IAccount = {}) {
    this.name = data?.AccountName;
    this.AccountName = data?.AccountName;
    this.value = data?.value;
    this.PaymentAddress = data?.PaymentAddress;
    this.ReadonlyKey = data?.ReadonlyKey;
    this.PrivateKey = data?.PrivateKey;
    this.PublicKey = data?.PublicKey;
    this.PublicKeyCheckEncode = data?.PublicKeyCheckEncode;
    this.PublicKeyBytes = data?.PublicKeyBytes;
    this.BLSPublicKey = data?.BLSPublicKey;
    // this.BlockProducerKey = data?.BlockProducerKey;
    this.ValidatorKey = data?.ValidatorKey;
    this.OTAKey = data?.OTAKey;
    this.PaymentAddressV1 = data?.PaymentAddressV1;
    this.ID = data.ID;
    this.accountName = data?.AccountName || data?.name;
  }

  toJSON() {
    return {
      name: this.name,
      AccountName: this.name,
      value: this.value,
      PaymentAddress: this.PaymentAddress,
      ReadonlyKey: this.ReadonlyKey,
      PrivateKey: this.PrivateKey,
      PublicKey: this.PublicKey,
      PublicKeyCheckEncode: this.PublicKeyCheckEncode,
      PublicKeyBytes: this.PublicKeyBytes,
      BLSPublicKey: this.BLSPublicKey,
      ValidatorKey: this.ValidatorKey,
      PaymentAddressV1: this.PaymentAddressV1,
    };
  }
}

export default Account;
