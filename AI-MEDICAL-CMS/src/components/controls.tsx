import * as React from "react";

const Controls = (props: React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="controls">
            <div className="controls--wrapper">
                { props.children }
            </div>
        </div>
    )
}

export const ControlEl = (props: React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="controls--el">
            { props.children }
        </div>
    )
}

export const ControlSpace = (): JSX.Element => {
    return (
        <div className="controls--space"></div>
    )
}

export default Controls;