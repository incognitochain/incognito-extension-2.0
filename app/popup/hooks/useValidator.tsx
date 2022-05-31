import React from 'react';

interface IProps {
    validator: any[];
}

const useValidator = (props: IProps) => {
    const { validator } = props;
    const [validate, setValidate] = React.useState<Array<any>>([]);
    React.useEffect(() => {
        setValidate([...validator]);
    }, []);
    return [validate];
};

export default useValidator;
