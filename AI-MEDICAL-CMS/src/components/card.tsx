import * as React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { isUrl } from "../helper";
import StyledButton from "./styled-button";

export type CardProps = RowProps<HTMLDivElement> & {
    picture?: string
}

const Card = React.forwardRef((props: CardProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const intl = useIntl();

    const getConfirmMsg = (label: string) => {
        return intl.formatMessage({ id: "card.confirm-action", defaultMessage: "Do you want to execute `{label}`?"}, { label });
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
        <div className="card" ref={ref} onClick={props.onClick}>
            <div className="card--wrapper">
                { props.picture && <div
                    className="card--pic"
                    role="img"
                    aria-label={intl.formatMessage({ id: "card.picture-label", defaultMessage: "Data picture" })}
                    style={{ backgroundImage: `url(${props.picture})` }}
                /> }
                <div className="card--body">
                    <h3 className="card--title">{ props.title }</h3>
                    { !String.isNullOrWhitespace(props.description) && <div className="card--intro">{ props.description }</div> }
                    { props.attributes != null && <>
                        <div className="card--attrs">
                            { Object.keys(props.attributes).map(attribute => {
                                return (
                                    <div className="card--attr" key={attribute}>
                                        <div className="card--attr-title">{ attribute }</div>
                                        <div className="card--attr-contents">{ props.attributes != null && props.attributes[attribute] }</div>
                                    </div>
                                )
                            }) }
                        </div>
                    </> }
                    <div className="card--actions">
                        { props.actions?.map((action, idx) => {
                            return (
                                <div className="card--action" key={idx}>
                                    <StyledButton themes={["light"]}>
                                        { renderLink(action) }
                                    </StyledButton>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Card;