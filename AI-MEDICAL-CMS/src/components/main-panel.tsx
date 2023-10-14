import * as React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { MainPanelProps } from "../interfaces/main-panel";
import PanelNav from "./panel-nav";

import { useIntl } from "react-intl";
import PanelHead from "./panel-head";
import copy from "fast-copy";
import equal from "fast-deep-equal";

library.add(fas);

type MainPanelContextProps = {
    openStatus: boolean;
    toggleOpen(): void;
    setBottomBufferSize(key: string, buffer: number): void;
}

export const MainPanelContext = React.createContext<MainPanelContextProps>({
    openStatus: false,
    toggleOpen: () => {},
    setBottomBufferSize: () => {} 
});

const MainPanel = (props: MainPanelProps): JSX.Element => {
    const intl = useIntl();
    const panelRef = React.useRef<HTMLDivElement>(null);
    const [ opened, setOpened ] = React.useState(false);
    const [ bottomBuffer, setBottomBuffer ] = React.useState<{ [key: string]: number }>({});

    const updateNavigator = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 1300) {
            panelRef.current?.classList.add("hide-nav");
        } else {
            panelRef.current?.classList.remove("hide-nav", "float-open");
        }
    }

    React.useEffect(() => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (opened) {
            panelRef.current?.classList.add(width >= 1300 ? "hide-nav" : "float-open");
        } else {
            panelRef.current?.classList.remove(width >= 1300 ? "hide-nav" : "float-open");
        }
    }, [ opened ]);

    React.useEffect(() => {
        document.querySelector("body")?.addEventListener("click", e => {
            const target = (e.target as HTMLElement);
            if (target.closest(".main-panel--nav") === null) {
                panelRef.current?.classList.remove("float-open");
            }
        });
        updateNavigator();
        window.addListener("load, resize", updateNavigator);
        return () => window.removeListener("load, resize", updateNavigator);
    }, []);

    const getButtomSpace = (): number => {
        const values = Object.values(bottomBuffer);
        if (values.length === 0) {
            return 0;
        }
        return Math.max(...values);
    }

    return (
        <MainPanelContext.Provider
            value={{
                openStatus: opened,
                toggleOpen: () => setOpened(v => !v),
                setBottomBufferSize: (key: string, buffer: number) => setBottomBuffer(b => {
                    const nb = copy(b);
                    nb[key] = buffer;
                    if (equal(nb, b)) {
                        return b;
                    }
                    return nb;
                })
            }}
        >
            <div className="main-panel" ref={panelRef}>
                <div className="main-panel--nav">
                    <PanelNav items={props.items} />
                </div>
                <div className="main-panel--core">
                    <div className="main-panel--core-head">
                        <div className="main-panel--core-container">
                            <PanelHead supportLocales={props.supportLocales} displayName={props.displayName} />
                        </div>
                    </div>
                    <div className="main-panel--core-wrapper">
                        <div className="main-panel--core-container">
                            <h1 className="a11y">
                                { intl.formatMessage({ id: "main-panel.cms", defaultMessage: "Content Management System" }) }
                            </h1>
                            { props.children }
                        </div>
                    </div>
                    <div className="main-panel--core-bottom" style={{ paddingBottom: getButtomSpace() }} />
                </div>
            </div>
        </MainPanelContext.Provider>
    )
}

export default MainPanel;