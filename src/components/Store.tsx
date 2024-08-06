import {useClickerContext} from "../utils/LocalContextProvider.tsx";
import useAppStore from "../hooks/useAppStore.ts";

const Store = () => {

    const { energy, tokens } = useAppStore((state) => ({
        energy: state.energy,
        tokens: state.tokens,
    }));

    return (
        <div>
            <div>
                tokens: {tokens} energy: {energy}
            </div>
        </div>
    );
};

export default Store;