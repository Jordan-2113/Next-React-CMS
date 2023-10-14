import * as React from "react";
import { Link } from "react-router-dom";
import StyledButton, { StyledButtonTheme } from "./styled-button";

type PageHeadAction = {
    href: string,
    label: string,
    themes?: StyledButtonTheme[]
}

type PageHeadProps = {
    actions?: PageHeadAction[]
}

const PageHead = (props: React.PropsWithChildren<PageHeadProps>): JSX.Element => {
    return (
        <div className="page-head">
            <div className="page-head--wrapper">
                <h2 className="page-head--title">{ props.children }</h2>
                { props.actions != null && <>
                    <div className="page-head--actions">
                        { props.actions.map((action, idx) => {
                            return (
                                <div className="page-head--action" key={idx}>
                                    <StyledButton themes={action.themes}>
                                        <Link to={action.href}>{ action.label }</Link>
                                    </StyledButton>
                                </div>
                            )
                        }) }
                    </div>
                </> }
            </div>
        </div>
    )
}

export default PageHead;