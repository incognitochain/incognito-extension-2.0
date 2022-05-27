import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';

interface IProps {
    name: string;
    address: string;
}

export const isKeychainExistByName = (list: IProps[], name: string) =>
    list.some((item) => isEqual(toLower(item.name), toLower(name)));

export const isKeyChainExist = (list: IProps[], addressBook: { name: string; address: string }) =>
    list.some(
        (item) => isEqual(item.address, addressBook.address) || isEqual(toLower(item.name), toLower(addressBook.name)),
    );

export const filterKeychainByKeySearch = (addressBook: { name: string; address: string }[], keySearch: string) =>
    addressBook?.filter(
        (item) =>
            includes(toLower(item?.name), toLower(keySearch)) || includes(toLower(item?.address), toLower(keySearch)),
    );
