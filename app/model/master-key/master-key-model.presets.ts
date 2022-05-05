import MasterKeyModel from './master-key-model';
import { MasterKeyModelProps } from './master-key-model.types';

const MasterKeyModelInit: MasterKeyModelProps = {
  name: '',
  isActive: false,
  passphrase: '',
  deletedAccountIds: [],
  mnemonic: '',
  isMasterless: false,
};

const DEFAULT_MASTER_KEY = new MasterKeyModel({
  name: 'Wallet',
  isActive: true,
});

const MASTERLESS = new MasterKeyModel({
  name: 'Masterless',
  isActive: false,
});

export { MasterKeyModelInit, DEFAULT_MASTER_KEY, MASTERLESS };
