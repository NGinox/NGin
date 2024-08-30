import React from 'react';

const useBeforeUnload = (callback: () => void) => {
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            callback();
            // If you want to show a confirmation dialog to the user
            // event.preventDefault();
            // event.returnValue = '';
        };

        window.addEventListener('pagehide', handleBeforeUnload);

        return () => {
            window.removeEventListener('pagehide', handleBeforeUnload);
        };
    }, [callback]);
};

export default useBeforeUnload;