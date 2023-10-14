import * as React from "react";
import Promise from "bluebird";
import { useIntl } from "react-intl";

Promise.config({ cancellation: true });

type PromiseBuilderType<T> = {
    promise(): Promise<T>,
    placeholder?: JSX.Element,
    error?: JSX.Element,
    children(data: T): JSX.Element,
    onStart?(): void,
    onDoneOrError?(data: T | null): void,
    renderStatus?: boolean
}

const PromiseBuilder = <T extends {} | []>(props: PromiseBuilderType<T>): JSX.Element => {
    const intl = useIntl();
    const { promise, placeholder, error, children, renderStatus } = props;
    const [ data, setData ] = React.useState<T | null | undefined>(undefined);
    const promiseRef = React.useRef<Promise<T> | null>(null);

    React.useEffect(() => {
        if (promiseRef.current != null) {
            promiseRef.current.cancel();
            promiseRef.current = null;
            setData(undefined);
        }
        promiseRef.current = promise();
        promiseRef.current.then(data => {
            setData(data);
            props.onDoneOrError?.call(null, data);
            return data;
        }).catch(err => {
            console.error(err);
            setData(null);
            props.onDoneOrError?.call(null, null);
        });
        props.onStart?.call(null);
        return () => {
            promiseRef.current?.cancel();
        }
    }, [ promise, props.onStart, props.onDoneOrError ]);

    return (
        <div className="promise-builder">
            { data === undefined && renderStatus ? <div className="promise-builder--loading">
                { placeholder || <div>{ intl.formatMessage({ id: "promise-builder.loading", defaultMessage: "loading..." }) }</div> }
            </div> : data === null && renderStatus ? <div className="promise-builder--error">
                { error || <div>{ intl.formatMessage({ id: "promise-builder.error", defaultMessage: "error, please try to reload the page." }) }</div> }
            </div> : data != null ? <div className="promise-builder--wrapper">
                { children(data) }
            </div> : null }
        </div>
    )
}

PromiseBuilder.defaultProps = {
    renderStatus: true
}

export default PromiseBuilder;