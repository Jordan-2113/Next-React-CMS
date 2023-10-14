import * as React from "react";
import LruCache from "lru-cache";
import { IntlProvider, MessageFormatElement } from "react-intl";
import translations from "../i18n/locales";
import merge from "deepmerge";

declare type MessageIds = FormatjsIntl.Message extends {
    ids: string;
} ? FormatjsIntl.Message['ids'] : string;

export type AppContextType = {
    cacheStore: LruCache<string, any>,
    theme: "light" | "dark",
    setTheme: (theme: "light" | "dark") => void,
    locale: string,
    changeLocale: (locale: string) => void
}

const AppContext = React.createContext<AppContextType>({
    cacheStore: new LruCache(),
    theme: "light",
    setTheme: () => {},
    locale: "zh-Hant",
    changeLocale: () => {}
});

const _SESSION_THEME_KEY = "_th";
const _SESSION_LANGUAGE_KEY = "_lan";

type AppContextProviderType = {
    i18n?: {
        [ lang: string ]: Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>
    }
}

export const AppContextProvider = (props: React.PropsWithChildren<AppContextProviderType>): JSX.Element => {
    const cacheStoreRef = React.useRef<LruCache<string, any>>(new LruCache({
        maxAge: 1000 * 60 * 60
    }));
    const [ theme, setTheme ] = React.useState<"light" | "dark">(
        process.env.REACT_APP_SUPPORT_DARK_THEME === "1" ? window.localStorage.getItem(_SESSION_THEME_KEY) as "light" | "dark" | null ?? "light" : "light"
    );
    const [ locale, changeLocale ] = React.useState<string>(
        process.env.REACT_APP_SUPPORT_MULTIPLE_LANGUAGE === "1" ? window.localStorage.getItem(_SESSION_LANGUAGE_KEY) ?? "zh-Hant" : "zh-Hant"
    );

    React.useEffect(() => {
        if (process.env.REACT_APP_SUPPORT_DARK_THEME === "1") {
            if (theme === "dark") {
                document.body.classList.add("theme--dark");
            } else {
                document.body.classList.remove("theme--dark");
            }
            window.localStorage.setItem(_SESSION_THEME_KEY, theme);
        }
    }, [ theme ]);

    React.useEffect(() => {
        if (process.env.REACT_APP_SUPPORT_MULTIPLE_LANGUAGE === "1") {
            window.localStorage.setItem(_SESSION_LANGUAGE_KEY, locale);
        }
    }, [ locale ]);

    const generateMessages = React.useCallback(() => {
        if (props.i18n != null) {
            return merge(props.i18n, translations);
        }
        return translations;
    }, [ props.i18n ]);

    return (
        <IntlProvider key={locale} locale={locale ?? "zh-Hant"} messages={generateMessages()[locale]}>
            <AppContext.Provider value={{ cacheStore: cacheStoreRef.current, theme, setTheme, locale, changeLocale }}>
                { props.children }
            </AppContext.Provider>
        </IntlProvider>
    )
}

export default AppContext;