import * as React from "react";
import { keepKeys } from "../helper";
import PromiseBuilder from "./promise-builder";
import Promise from "bluebird";
import VariableScope from "./variable-scope";

type ValueBuilderType<T> = {
    promise: (params: { [key: string]: any }) => () => Promise<T>,
    placeholder?: JSX.Element,
    error?: JSX.Element,
    children(data: T): JSX.Element,
    included?: string[],
    onStart?(): void,
    onDoneOrError?(data: T | null): void,
    renderStatus?: boolean
}

const ValueBuilder = <T extends [] | {}>(props: ValueBuilderType<T>): JSX.Element => {
    const { promise, included: includedKeys, renderStatus, placeholder, error } = props;
    const scope = React.useContext(VariableScope);
    const [ values, setValues ] = React.useState<{ [key: string]: any }>(includedKeys != null ? keepKeys(scope?.values ?? {}, includedKeys) : scope?.values ?? {});
    const fetchData = React.useCallback<any>(() => promise(values || {}), [ promise, values ]);

    React.useEffect(() => {
        const newValues = includedKeys != null ? keepKeys(scope?.values ?? {}, includedKeys) : scope?.values ?? {};
        // Due to prevent redundancy rendering handled by the variable scope
        // This layer will be disabled checking for the variable scope reload method
        // if (!equal(values, newValues)) {
        //     setValues(newValues);
        // }
        setValues(newValues);
    }, [ includedKeys, scope.values ]);

    return (
        <div className="query-builder">
            <div className="query-builder--wrapper">
                { fetchData != null && <>
                    <PromiseBuilder
                        promise={fetchData}
                        onStart={props.onStart}
                        onDoneOrError={props.onDoneOrError}
                        renderStatus={renderStatus}
                        placeholder={placeholder}
                        error={error}
                    >
                        { props.children }
                    </PromiseBuilder>
                </> }
            </div>
        </div>
    )
}

PromiseBuilder.defaultProps = {
    renderStatus: true
}

export default ValueBuilder;