import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {CombinedSubscriberData} from "../types/subscriber.type.ts";

const AnimatedOutlet = ({ context }: { context: CombinedSubscriberData }): React.JSX.Element => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={true}>
            <Outlet context={context} key={location.pathname} />
        </AnimatePresence>
    );
};

export default AnimatedOutlet;