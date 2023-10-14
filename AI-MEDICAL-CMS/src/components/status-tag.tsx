import * as React from "react";

export type StatusTagProps = {
    status: "active" | "warning" | "error"
}

const StatusTag = (props: React.PropsWithChildren<StatusTagProps>): JSX.Element => {
    return (
        <div className={`status-tag status-tag--${props.status ?? "active"}`}>
            { props.children }
        </div>
    )
}

export default StatusTag;