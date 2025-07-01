import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

const Loader = () => {
    return (
        <span className="animate-spin">
            <ImSpinner3 size={18} />
        </span>
    );
};

export default Loader;
