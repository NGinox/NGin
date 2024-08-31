import {Toaster} from "react-hot-toast";

const StyledToaster = () => {
    return (
        <div>
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        backgroundColor: '#3c284a',
                        color: '#fff',
                        fontFamily: 'Futura'
                    },
                    success: {
                        iconTheme: {
                            primary: '#E23969',
                            secondary: '#fff',
                        },
                    },
                }}/>
        </div>
    );
};

export default StyledToaster;