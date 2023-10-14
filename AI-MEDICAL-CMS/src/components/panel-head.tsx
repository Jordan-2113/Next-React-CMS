import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import AuthContext from "../contexts/auth";
import { PopupSidePanelContext } from "./popup-side-panel";
import { useIntl } from "react-intl";
import AppContext from "../contexts/app";
import FieldHolder, { FieldHolderEl } from "./field-holder";
import { CheckboxField, RadioField, SelectField } from "./fields";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';

type PanelHeadProps = {
    displayName: (payload: any) => string | null;
    supportLocales?: { [ lang: string ]: string };
}

const PanelHead = (props: PanelHeadProps) => {
    const intl = useIntl();
    const appContext = React.useContext(AppContext);
    const authContext = React.useContext(AuthContext);
    const username = props.displayName(authContext.payload);
    const popupSidePanel = React.useContext(PopupSidePanelContext);

    const buildSettingPanel = () => {
        const supportLocales = props.supportLocales ?? {
            "zh-Hant": "繁體中文",
            "en": "English"
        }

        return (
            <FieldHolder size="full">
                <FieldHolderEl>
                    <CheckboxField
                        title={intl.formatMessage({ id: "main-panel.login-status", defaultMessage: "Login status" })}
                        options={[ { label: intl.formatMessage({ id: "main-panel.keep-login", defaultMessage: "Keep login (Included close browser)" }), value: "0" } ]}
                        defaultChecked={authContext.saveToStorage}
                        onChange={e => authContext.changeLoginCredentialStatus(e.target.checked)}
                    />
                </FieldHolderEl>
                { process.env.REACT_APP_SUPPORT_DARK_THEME === "1" && <FieldHolderEl>
                    <RadioField
                        title={intl.formatMessage({ id: "main-panel.theme", defaultMessage: "Theme" })}
                        options={[
                            { label: intl.formatMessage({ id: "main-panel.light", defaultMessage: "Light" }), value: "light" },
                            { label: intl.formatMessage({ id: "main-panel.dark", defaultMessage: "Dark" }), value: "dark" }
                        ]}
                        value={appContext.theme}
                        onChange={e => appContext.setTheme(e.target.value as "light" | "dark")}
                    />
                </FieldHolderEl> }
                { process.env.REACT_APP_SUPPORT_MULTIPLE_LANGUAGE === "1" && <FieldHolderEl>
                    <SelectField
                        title={intl.formatMessage({ id: "main-panel.language", defaultMessage: "Language" })}
                        value={appContext.locale}
                        onChange={e => appContext.changeLocale(e.target.value)}
                        defaultDisabled
                    >
                        { Object.keys(supportLocales).map(locale => <>
                            <option value={locale}>{ supportLocales[locale] }</option>
                        </>) }
                    </SelectField>
                </FieldHolderEl> }
            </FieldHolder>
        )
    }
    
    return (
        <div className="panel-head">
            <div className="panel-head--wrapper">
                <h1 className="panel-head--title">
                    { intl.formatMessage({ id: "main-panel.cms", defaultMessage: "Content Management System" }) }
                </h1>
                <div className="panel-head--account">
                    { username && <>
                        <div className="panel-head--account-name">{ username }</div>
                        { process.env.REACT_APP_CHANGE_PASSWORD_PATH && <Tippy
                            content={intl.formatMessage({ id: "main-panel.change-password", defaultMessage: "Change password" })}
                            animation="scale-subtle"
                        >
                            <Link
                                to={process.env.REACT_APP_CHANGE_PASSWORD_PATH}
                                className="panel-head--account-password"
                                data-tooltip={intl.formatMessage({ id: "main-panel.change-password", defaultMessage: "Change password" })}
                            >
                                <FontAwesomeIcon icon={[ 'fas', 'lock' ]} color={appContext.theme === "light" ? "#3b3b3b" : "#e8e8e8"} />
                                <div className="a11y">
                                    {intl.formatMessage({ id: "main-panel.change-password", defaultMessage: "Change password" })}
                                </div>
                            </Link>
                        </Tippy> }
                    </> }
                    <Tippy content={intl.formatMessage({ id: "main-panel.setting", defaultMessage: "Settings" })} animation="scale-subtle">
                        <button
                            className="panel-head--setting"
                            data-tooltip={intl.formatMessage({ id: "main-panel.setting", defaultMessage: "Settings" })}
                            onClick={() => popupSidePanel.push("panel-head-setting", intl.formatMessage({ id: "main-panel.setting", defaultMessage: "Settings" }), buildSettingPanel(), "right")}
                        >
                            <FontAwesomeIcon icon={[ 'fas', 'cog' ]} color={appContext.theme === "light" ? "#3b3b3b" : "#e8e8e8"} />
                            <div className="a11y">
                                {intl.formatMessage({ id: "main-panel.setting", defaultMessage: "Settings" })}
                            </div>
                        </button>
                    </Tippy>
                    { username && <Tippy content={intl.formatMessage({ id: "main-panel.logout", defaultMessage: "Logout" })} animation="scale-subtle">
                        <button type="button" onClick={() => authContext.logout()} className="panel-head--account-more">
                            {/* https://www.flaticon.com/free-icon/onoff-button_1228?term=off&page=1&position=2&related_item_id=1228 */}
                            <svg width="25" height="25" viewBox="0 0 24.303 24.303">
                                <path d="M10.269,11.298V1.883C10.269,0.844,11.113,0,12.152,0s1.883,0.844,1.883,1.883v9.415
		                            c0,1.039-0.844,1.883-1.883,1.883S10.269,12.337,10.269,11.298z M19.616,2.761c-0.61-0.483-1.5-0.377-1.983,0.234
		                            c-0.483,0.612-0.378,1.5,0.234,1.984c2.24,1.767,3.524,4.413,3.524,7.261c0,5.094-4.145,9.239-9.238,9.239
		                            c-5.094,0-9.239-4.145-9.239-9.239c0-2.847,1.283-5.492,3.521-7.258c0.612-0.483,0.717-1.371,0.234-1.984
		                            c-0.483-0.612-1.37-0.716-1.984-0.234C1.764,5.069,0.089,8.523,0.089,12.24c0,6.652,5.412,12.063,12.063,12.063
		                            s12.063-5.412,12.063-12.063C24.215,8.521,22.538,5.067,19.616,2.761z" />
                            </svg>
                            <div className="a11y">
                                {intl.formatMessage({ id: "main-panel.logout", defaultMessage: "Logout" })}
                            </div>
                        </button>
                    </Tippy> }
                </div>
            </div>
        </div>
    )
}

export default PanelHead;