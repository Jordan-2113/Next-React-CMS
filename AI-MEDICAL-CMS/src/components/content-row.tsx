import * as React from "react";
import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { isUrl } from "../helper";
import StyledButton from "./styled-button";

export type ContentRowProps = RowProps<HTMLDivElement> & {
    picture?: string
}

const ContentRow = React.forwardRef((props: ContentRowProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const intl = useIntl();

    const getConfirmMsg = (label: string) => {
        return intl.formatMessage({ id: "content-row.confirm-action", defaultMessage: "Do you want to execute `{label}`?"}, { label });
    }

    const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>, action: BaseRowAction): void => {
        e.stopPropagation();
        if (action.requiredConfirm && !window.confirm(getConfirmMsg(action.label))) {
            e.preventDefault();
        }
        action.onClick?.call(window, e);
    }

    const renderLink = (action: BaseRowAction): JSX.Element => {
        if (isUrl(action.href) || action.absolutePath) {
            return (
                <a href={action.href} target="_blank" rel="noreferrer" onClick={e => handleActionClick(e, action)}>
                    { action.label }
                </a>
            )
        }
        return (
            <Link to={action.href} onClick={e => handleActionClick(e, action)}>
                { action.label }
            </Link>
        );
    }

    return (
        <div className="content-row" ref={ref} onClick={props.onClick}>
            <div className="content-row--wrapper">
                { props.picture && <div
                    className="content-row--pic"
                    role="img"
                    aria-label={intl.formatMessage({ id: "content-row.picture-label", defaultMessage: "Data picture" })}
                    style={{ backgroundImage: `url(${props.picture}), url("/images/row_placehoder.png")` }}
                ></div> }
                <div className={`content-row--body${props.picture ? "" : " full"}`}>
                    <div className="content-row--fill"></div>
                    <h2 className="content-row--title">
                        { props.title }
                    </h2>
                    { !String.isNullOrWhitespace(props.description) && <>
                        <div className="content-row--fill"></div>
                        <div className="content-row--intro">
                            { props.description }
                        </div>
                    </> }
                    { props.attributes != null && <>
                        <div className="content-row--fill"></div>
                        <div className="content-row--attrs">
                            { Object.keys(props.attributes).map(attribute => {
                                return (
                                    <div className="content-row--attr" key={attribute}>
                                        <div className="content-row--attr-title">{ attribute }</div>
                                        <div className="content-row--attr-fill"></div>
                                        <div className="content-row--attr-contents">{ props.attributes != null && props.attributes[attribute] }</div>
                                    </div>
                                )
                            }) }
                        </div>
                    </> }
                    { props.actions != null && <>
                        <div className="content-row--fill"></div>
                        <div className="content-row--actions">
                            { props.actions.map((action, idx) => {
                                return (
                                    <div className="content-row--action" key={idx}>
                                        <StyledButton themes={["light"]}>
                                            { renderLink(action) }
                                        </StyledButton>
                                    </div>
                                )
                            }) }
                        </div>
                    </> }
                    <div className="content-row--fill"></div>
                </div>
            </div>
        </div>
    )
});

export type ContentRowPlaceholderProps = {
    description?: boolean,
    attr?: boolean,
    picture?: boolean
}

export const ContentRowPlaceholder = (props: ContentRowPlaceholderProps): JSX.Element => {
    const intl = useIntl();

    return (
        <div className="content-row">
            <div className="content-row--wrapper">
                { props.picture && <div
                    className="content-row--pic"
                    role="img"
                    aria-label={intl.formatMessage({ id: "content-row.picture-label", defaultMessage: "Data picture" })}
                    style={{ backgroundImage: `url("./images/row_placehoder.png")` }}
                ></div> }
                <div className={`content-row--body${props.picture ? "" : " full"}`}>
                    <div className="content-row--fill"></div>
                    <div className="content-row--title">
                        <Skeleton />
                    </div>
                    { props.description && <>
                        <div className="content-row--fill"></div>
                        <div className="content-row--intro">
                            <Skeleton />
                        </div>
                    </> }
                    { props.attr && <>
                        <div className="content-row--fill"></div>
                        <div className="content-row--attrs">
                            { [0, 1, 2].map(attribute => {
                                return (
                                    <div className="content-row--attr" key={attribute}>
                                        <div className="content-row--attr-title" style={{ marginRight: 20 }}><Skeleton /></div>
                                        <div className="content-row--attr-fill"></div>
                                        <div className="content-row--attr-contents"><Skeleton width={100} /></div>
                                    </div>
                                )
                            }) }
                        </div>
                    </> }
                    <div className="content-row--fill"></div>
                </div>
            </div>
        </div>
    )
}

export const ContentRowEmpty = (): JSX.Element => {
    const intl = useIntl();
    
    return (
        <div className="content-row">
            <div className="content-row--wrapper">
                <div className="content-row--empty">
                    { intl.formatMessage({ id: "content-row.no-content", defaultMessage: "There is no content to display" }) }
                </div>
            </div>
        </div>
    );
}

export default ContentRow;