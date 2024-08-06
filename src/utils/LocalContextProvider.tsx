import React, {ReactNode, useContext, useState} from "react";

interface ClickerContextType {
    tokens: number;
    energy: number;
    updateState: (tokens: number, energy: number) => void;
}

interface ClickerProviderProps {
    children: ReactNode;
}

export const ClickerContext = React.createContext<ClickerContextType>({
    tokens: 0,
    energy: 1000,
    updateState: () => {}
});


const ClickerProvider: React.FC<ClickerProviderProps> = ({ children }) => {
    const [tokens, setTokens] = useState(0);
    const [energy, setEnergy] = useState(1000);

    const updateState = (newTokens: number, newEnergy: number) => {
        setTokens(newTokens);
        setEnergy(newEnergy);
    };

    const contextValue = {
        tokens,
        energy,
        updateState,
    };

    return (
        <ClickerContext.Provider value={contextValue}>
            {children}
        </ClickerContext.Provider>
    );
};

export const useClickerContext = () => useContext(ClickerContext);

export default ClickerProvider