import React from 'react';

const useBeforeUnload = (callback: () => void) => {
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            callback();
            // If you want to show a confirmation dialog to the user
            // event.preventDefault();
            // event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [callback]);
};

export default useBeforeUnload;