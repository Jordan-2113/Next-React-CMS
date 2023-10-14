import * as React from "react";

export type FieldHolderProps = {
    size: "small" | "middle" | "full"
}

const FieldHolder = (props: React.PropsWithChildren<FieldHolderProps>): JSX.Element => {
    return (
        <div className={`field--holder ${props.size ?? "full"}`}>
            { props.children }
        </div>
    )
}

export const FieldHolderEl = (props: React.PropsWithChildren<{ col?: "3" | "4" | "6" | "8" | "9" }>): JSX.Element => {
    const classnames = [ "field--holder-el" ];
    if (!String.isNullOrWhitespace(props.col)) {
        classnames.push(`field--holder-el-${props.col}`);
    }
    return (
        <div className={classnames.join(" ")}>
            { props.children }
        </div>
    );
}

export const FieldHolderTitle = (props: React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="field--holder-title">
            <span>
                { props.children }
            </span>
        </div>
    )
}

export default FieldHolder;