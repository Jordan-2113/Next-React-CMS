import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanelNavigatorItem } from "../interfaces/main-panel";
import { Link, useLocation } from "react-router-dom";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import AppContext from "../contexts/app";
import { useIntl } from "react-intl";
import { MainPanelContext } from "./main-panel";

export type PanelNavProps = {
    items: PanelNavigatorItem[]
}

const PanelNav = (props: PanelNavProps): JSX.Element => {
    const intl = useIntl();
    const mainPanelContext = React.useContext(MainPanelContext);
    const appContext = React.useContext(AppContext);
    const location = useLocation();
    const [ currentPath, setCurrentPath ] = React.useState("/");

    React.useEffect(() => {
        setCurrentPath(location?.pathname ?? "/");
    }, [ location ]);

    const isActive = (item: PanelNavigatorItem, currentPath: string): boolean => {
        if (item.matchExectPath === true) {
            return currentPath === item.path;
        }
        return currentPath.startsWith(item.path);
    }

    return (
        <div className="panel-nav">
            <header className="panel-nav--head">
                <button className="panel-nav--head-tgc" type="button" onClick={() => mainPanelContext.toggleOpen()}>
                    <svg viewBox="0 0 23 23">
                        <title>{ intl.formatMessage({ id: "main-panel.toggle-menu", defaultMessage: "Toggle menu open / close" }) }</title>
                        <path fill="transparent" strokeLinecap="round" d="M 2 2.5 L 14 2.5" />
                        <path fill="transparent" strokeLinecap="round" d="M 2 9.423 L 20 9.423" />
                        <path fill="transparent" strokeLinecap="round" d="M 2 16.346 L 12 16.346" />
                    </svg>
                </button>
                <Link to="/">
                    <img
                        src={process.env.REACT_APP_LOGO_PATH ?? (appContext.theme === "light" ? "./images/--default-logo.png" : "./images/--default-logo-dark.png")}
                        alt="CMS Logo"
                    />
                </Link>
            </header>
            <nav className="panel-nav--core">
                <div className="panel-nav--core-wrapper">
                    <div className="panel-nav--core-body">
                        { props.items.map(item => {
                            if (!item.shouldShowInNavigator) {
                                return null;
                            }
                            return (
                                <div className={`panel-nav--core-l-1${isActive(item, currentPath)?" active":""}`} key={item.path}>
                                    <Link to={item.path} className="panel-nav--core-l-1-item">
                                        { !String.isNullOrWhitespace(item.icon) && (<div className="panel-nav--core-l-1-item-svg">
                                            <FontAwesomeIcon icon={["fas", item.icon as IconName]} />
                                        </div>) }
                                        <span>{ item.title }</span>
                                    </Link>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </nav>
            <footer className="panel-nav--footer">
                { `${new Date().getFullYear()} © ${process.env.REACT_APP_CP || "AMUS"} 版權所有` }
            </footer>
        </div>
    )
}

export default PanelNav;