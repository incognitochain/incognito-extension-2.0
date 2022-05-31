import React from 'react';

const useOutsideRef = (ref: any, callback?: () => any) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (typeof ref?.current?.contains === 'function' && !ref?.current?.contains(event.target)) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideRef;
