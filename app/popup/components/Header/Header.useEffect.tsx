import React from 'react';
import { reset } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { FORM_CONFIGS } from './Header.searchBox';
import { keySearchSelector } from './Header.selector';

interface IProps {
    data: any[];
    handleFilter: () => any[];
}

export interface ISearchBox {
    result: any[];
    keySearch: string;
    handleFilter: () => any[];
}

export const useSearchBox = (props: IProps) => {
    const { data, handleFilter } = props;
    const dispatch = useDispatch();
    const keySearch = useSelector(keySearchSelector);
    const isKeyEmpty = isEmpty(keySearch);
    const result: any[] = isKeyEmpty ? data : handleFilter();
    const filter = (data: any[], handleFilter: () => any) => {
        const result: any[] = isKeyEmpty ? data : handleFilter();
        return result;
    };
    React.useEffect(() => {
        dispatch(reset(FORM_CONFIGS.formName));
    }, []);
    return {
        result,
        filter,
    };
};

export const useSearchBoxVer2 = () => {
    const dispatch = useDispatch();
    const keySearch = useSelector(keySearchSelector);
    const isKeyEmpty = isEmpty(keySearch);
    const filter = (data: any[], handleFilter: () => any) => {
        const result: any[] = isKeyEmpty ? data : handleFilter();
        return result;
    };
    React.useEffect(() => {
        dispatch(reset(FORM_CONFIGS.formName));
    }, []);
    return [filter];
};
