import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUrlParams } from "../helper";

type AuthContextState = {
    isLogined: boolean,
    authMethod: "JWT" | "OAuth" | null,
    token: string | null,
    payload: any,
    accessDeniedPath: string,
    loginPath: string,
    saveToStorage: boolean
}

export type AuthContextType = AuthContextState & {
    login(token: string, authMethod: "JWT" | "OAuth", payload: any): void,
    logout(): void,
    loginedRedirect(): void,
    deniedRedirect(): void,
    changeLoginCredentialStatus(saveToStorage: boolean): void
}

const AuthContext = React.createContext<AuthContextType>({
    isLogined: false,
    authMethod: null,
    token: null,
    payload: null,
    loginPath: "/auth/login",
    accessDeniedPath: "/auth/access-denied",
    saveToStorage: false,
    login: () => {},
    logout: () => {},
    loginedRedirect: () => {},
    deniedRedirect: () => {},
    changeLoginCredentialStatus: () => {}
});

const _shortcut: { logout: (() => void) | null, accessDenied: (() => void) | null } = {
    logout: null,
    accessDenied: null
}

const _SESSION_IS_LOGINED_KEY = "_lg";
const _SESSION_AUTH_METHOD_KEY = "_a";
const _SESSION_TOKEN_KEY = "_t";
const _SESSION_PAYLOAD_KEY = "_p";
const _SESSION_SAVE_CREDENTIAL_KEY = "_sc";

export const AuthContextProvider = (props: React.PropsWithChildren<{}>): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ { isLogined, authMethod, token, loginPath, payload, accessDeniedPath, saveToStorage }, setState ] = React.useState<AuthContextState>({
        isLogined: window.localStorage.getItem(_SESSION_IS_LOGINED_KEY) === "1",
        authMethod: window.localStorage.getItem(_SESSION_AUTH_METHOD_KEY) as "JWT" | "OAuth" | null,
        token: window.localStorage.getItem(_SESSION_TOKEN_KEY),
        payload: JSON.parse(window.localStorage.getItem(_SESSION_PAYLOAD_KEY) || "null"),
        loginPath: process.env.REACT_APP_LOGIN_PATH || "/auth/login",
        accessDeniedPath: process.env.REACT_APP_ACCESS_DENIED_PATH || "/auth/access-denied",
        // saveToStorage default is true
        saveToStorage: !(window.localStorage.getItem(_SESSION_SAVE_CREDENTIAL_KEY) === "0")
    });

    const changeLoginCredentialStatus = (saveToStorage: boolean) => {
        if (saveToStorage) {
            window.localStorage.setItem(_SESSION_SAVE_CREDENTIAL_KEY, "1");
            if (isLogined) {
                window.localStorage.setItem(_SESSION_IS_LOGINED_KEY, "1");
                window.localStorage.setItem(_SESSION_AUTH_METHOD_KEY, authMethod || "");
                window.localStorage.setItem(_SESSION_TOKEN_KEY, token || "");
                window.localStorage.setItem(_SESSION_PAYLOAD_KEY, JSON.stringify(payload || null));
            }
        } else {
            window.localStorage.setItem(_SESSION_SAVE_CREDENTIAL_KEY, "0");
            window.localStorage.removeItem(_SESSION_IS_LOGINED_KEY);
            window.localStorage.removeItem(_SESSION_AUTH_METHOD_KEY);
            window.localStorage.removeItem(_SESSION_TOKEN_KEY);
            window.localStorage.removeItem(_SESSION_PAYLOAD_KEY);
        }
        setState(state => ({ ...state, saveToStorage }));
    }

    const login = (token: string, authMethod: "JWT" | "OAuth" = "JWT", payload: any) => {
        setState(state => ({
            isLogined: true,
            authMethod,
            token,
            payload,
            loginPath: state.loginPath,
            accessDeniedPath: state.accessDeniedPath,
            saveToStorage: state.saveToStorage
        }));
        if (saveToStorage) {
            window.localStorage.setItem(_SESSION_IS_LOGINED_KEY, "1");
            window.localStorage.setItem(_SESSION_AUTH_METHOD_KEY, authMethod || "");
            window.localStorage.setItem(_SESSION_TOKEN_KEY, token || "");
            window.localStorage.setItem(_SESSION_PAYLOAD_KEY, JSON.stringify(payload || null));
        }
    }

    const logout = () => {
        setState(state => ({
            isLogined: false,
            authMethod: null,
            token: null,
            payload: null,
            loginPath: state.loginPath,
            accessDeniedPath: state.accessDeniedPath,
            saveToStorage: state.saveToStorage
        }));
        window.localStorage.removeItem(_SESSION_IS_LOGINED_KEY);
        window.localStorage.removeItem(_SESSION_AUTH_METHOD_KEY);
        window.localStorage.removeItem(_SESSION_TOKEN_KEY);
        window.localStorage.removeItem(_SESSION_PAYLOAD_KEY);
    }

    const loginedRedirect = () => {
        if (!isLogined) {
            console.warn("AuthContext: logined status currently is false, but requested logined redirect.");
        }
        const params = getUrlParams(location.search?.substring(1) || "");
        navigate(params['r'] == null ? "/" : params['r'] as string);
    }

    const deniedRedirect = () => {
        navigate(accessDeniedPath);
    }

    // shortcut for customize fetch
    _shortcut.logout = logout;
    _shortcut.accessDenied = deniedRedirect;

    return (
        <AuthContext.Provider value={{
            isLogined, authMethod, token, payload, loginPath, accessDeniedPath, login, logout, loginedRedirect, deniedRedirect, saveToStorage,
            changeLoginCredentialStatus
        }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export const authFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const isLogined = window.localStorage.getItem(_SESSION_IS_LOGINED_KEY) === "1";
    const token = window.localStorage.getItem(_SESSION_TOKEN_KEY);

    return fetch(input, isLogined ? {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`
        }
    } : init).then(resp => {
        if (resp.status === 403) {
            _shortcut.accessDenied?.call(null);
        } else if (resp.status === 401) {
            _shortcut.logout?.call(null);
        }
        return resp;
    });
}

export default AuthContext;