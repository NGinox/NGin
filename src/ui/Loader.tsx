import {MutatingDots} from "react-loader-spinner";

const Loader = () => {
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
};

export default Loader;