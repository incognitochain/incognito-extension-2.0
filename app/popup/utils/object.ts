import camelCase from 'lodash/camelCase';

// eslint-disable-next-line no-unused-vars
export const camelCaseKeys: (obj: any) => any = (obj: any) => {
    if (Array.isArray(obj)) {
        return obj.map((v) => camelCaseKeys(v));
    }
    if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelCaseKeys(obj[key]),
            }),
            {},
        );
    }
    return obj;
};
