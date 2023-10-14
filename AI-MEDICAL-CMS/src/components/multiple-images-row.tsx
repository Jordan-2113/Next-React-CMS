import * as React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { isUrl } from "../helper";
import StyledButton from "./styled-button";

type MultipleImagesRowPicture = {
    label: string,
    path: string
}

export type MultipleImagesRowProps = RowProps<HTMLDivElement> & {
    pictures?: MultipleImagesRowPicture[]
}

const MultipleImagesRow = React.forwardRef((props: MultipleImagesRowProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const intl = useIntl();

    const getConfirmMsg = (label: string) => {
        return intl.formatMessage({ id: "multiple-images-row.confirm-action", defaultMessage: "Do you want to execute `{label}`?"}, { label });
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
        <div className="multiple-images-row" ref={ref} onClick={props.onClick}>
            <div className="multiple-images-row--wrapper">
                <div className="multiple-images-row--title">
                    { props.title }
                </div>
                { !String.isNullOrWhitespace(props.description) && <div className="multiple-images-row--intro">{ props.description }</div> }
                { props.attributes != null && (
                    <div className="multiple-images-row--attrs">
                        { Object.keys(props.attributes).map(attribute => {
                            return (
                                <div className="multiple-images-row--attr" key={attribute}>
                                    <div className="multiple-images-row--attr-title">{ attribute }</div>
                                    <div className="multiple-images-row--attr-contents">{ props.attributes != null && props.attributes[attribute] }</div>
                                </div>
                            )
                        }) }
                    </div>
                ) }
                { props.pictures != null && (
                    <div className="multiple-images-row--images">
                        { props.pictures.map((picture, idx) => {
                            return (
                                <div
                                    className="multiple-images-row--image"
                                    key={idx}
                                    role="img"
                                    aria-label={intl.formatMessage({ id: "multiple-images-row.picture-label", defaultMessage: "Data picture" })}
                                >
                                    <div className="multiple-images-row--image-holder" style={{ backgroundImage: `url(${picture.path})` }}></div>
                                    <div className="multiple-images-row--image-alt">{ picture.label }</div>
                                </div>
                            )
                        }) }
                    </div>
                ) }
                <div className="multiple-images-row--actions">
                    { props.actions?.map((action, idx) => {
                        return (
                            <div className="multiple-images-row--action" key={idx}>
                                <StyledButton themes={["light"]}>
                                    { renderLink(action) }
                                </StyledButton>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
});

export default MultipleImagesRow;