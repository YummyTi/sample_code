import React from 'react';

interface IProps {
    indeterminate: any;
}

const TCheckbox = React.forwardRef<HTMLInputElement, Partial<IProps>>(
    ({indeterminate, ...rest}, ref) => {
        const defaultRef = React.useRef<any>();
        const resolvedRef: any = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    },
);

export default TCheckbox;
