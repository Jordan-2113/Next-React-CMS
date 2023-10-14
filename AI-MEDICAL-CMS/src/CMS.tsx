import { AnimatePresence } from 'framer-motion';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PopupSidePanel from "./components/popup-side-panel";
import AppContext, { AppContextProvider } from './contexts/app';
import { AuthContextProvider } from './contexts/auth';
import { configs } from './config';
import Core from './core';
import * as React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

const CMS = (): JSX.Element => {
    return (
        <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0,0)}>
            <HashRouter>
                <AppContextProvider i18n={configs.i18n}>
                    <AuthContextProvider>
                        <SkeletonWrapper>
                            <PopupSidePanel key="popup-side-panel">
                                <Core />
                            </PopupSidePanel>
                            <ToastContainer
                                key="toast-container" limit={3} position="bottom-right" autoClose={2000} hideProgressBar
                                closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover
                            />
                        </SkeletonWrapper>
                    </AuthContextProvider>
                </AppContextProvider>
            </HashRouter>
        </AnimatePresence>
    )
}

const SkeletonWrapper = (props: React.PropsWithChildren<{}>): JSX.Element => {
    const appContext = React.useContext(AppContext);

    return (
        <SkeletonTheme
            color={appContext.theme === 'dark' ? '#5a5a5a' : '#eaeaea'}
            highlightColor={appContext.theme === 'dark' ? '#7a7a7a' : '#f3f3f3'}
        >
            { props.children }
        </SkeletonTheme>
    )
}

export default CMS;
