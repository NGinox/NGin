import React from 'react';
import {MutatingDots} from "react-loader-spinner";

interface HandleLoadingAndErrorProps {
    isLoading: boolean;
    isError: boolean;
    children: React.ReactNode
}
const HandleLoadingAndError: React.FC<HandleLoadingAndErrorProps> = ({isLoading, isError, children}) => {

    if (isLoading) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000] to-[#271732]">
                <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="rgba(226,57,105,0.7)"
                    secondaryColor="rgba(226,57,105,0.7)"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    if (isError) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#000] to-[#271732]">
                Error :(
            </div>
        )
    }

    return (
        <>{children}</>
    )
};

export default HandleLoadingAndError;