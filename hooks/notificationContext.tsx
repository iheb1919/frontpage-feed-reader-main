/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { toast, ToastContainer, type ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';

type IsNotificationProviderProps = {
    children: ReactNode;
};
type Type = '' | 'success' | 'info' | 'warning' | 'error'
type ISUPLOAD = {
    notify: (message: string, type?: Type) => void
};

export const isNotifications = createContext<ISUPLOAD | null>(null);

const IsNotificationProvider = ({ children }: IsNotificationProviderProps) => {
    const options: ToastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    }
    const notify = (message: string, type: Type = '') => {
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            case 'warning':
                toast.warn(message, options);
                break;
            case 'info':
                toast.info(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    };

    return (
        <isNotifications.Provider value={{ notify }}>
            {children}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"

            />
        </isNotifications.Provider>
    );
};

export default IsNotificationProvider;

export const useIsNotification = () => {
    const context = useContext(isNotifications);
    if (context === null) {
        throw new Error("Oops! Looks like you are outside of the provider");
    }
    return context;
};
