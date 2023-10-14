import helper from "./helper";

const ConfigContext = React.createContext();

export default ConfigContext;

export const ConfigContextProvider = ({ children }) => {
    const [ acceptCookie, setAcceptCookie ] = React.useState(false);

    React.useEffect(() => {
        if (localStorage[helper.STORAGE_USE_COOKIES]) {
            setAcceptCookie(true);
        }
    }, [])

    return (
        <ConfigContext.Provider value={{ acceptCookie, setAcceptCookie }}>
            { children }
        </ConfigContext.Provider>
    )
}