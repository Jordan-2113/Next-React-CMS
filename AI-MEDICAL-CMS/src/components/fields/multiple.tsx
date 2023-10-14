import * as React from "react";
import { useIntl } from "react-intl";
import { getRandString } from "../../helper";
import StyledButton from "../styled-button";

type MulitpleFieldValueType = { [key: string]: any } & { id: any };

export type MulitpleFieldProps<T> = Field & {
    title: string
    values: MulitpleFieldValueType[]
    maxLength?: number,
    children(props: { value: T, id: string, index: number }): JSX.Element,
    renderRemove?(props: { index: number, value: T }): JSX.Element
}

type InternalMulitpleFieldValue = {
    default: boolean,
    id: string,
    data: MulitpleFieldValueType
}

const ids: string[] = [];

const getPropsValues = (values: MulitpleFieldValueType[], maxLength?: number) => {
    if (values != null && values.length > 0) {
        while (values.length - ids.length > 0) {
            ids.push(getRandString(10));
        }
    } else if (ids.length === 0) {
        ids.push(getRandString(10));
    }
    const propsValues = values.map((value, idx) => ({
        data: value,
        id: ids[idx],
        default: true
    })) ?? [];
    if (propsValues.length === 0 && (maxLength == null || (maxLength != null && propsValues.length < maxLength))) {
        propsValues.push({
            data: { id: null },
            id: ids[0],
            default: false
        });
    }
    return propsValues;
}

const MultipleField = React.forwardRef((props: MulitpleFieldProps<any>, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const intl = useIntl();
    const [ values, setValues ] = React.useState<InternalMulitpleFieldValue[]>(getPropsValues(props.values, props.maxLength));
    const [ removed, setRemoved ] = React.useState<any[]>([]);

    const appendItem = () => {
        if (props.maxLength == null || (props.maxLength != null && values.length < props.maxLength)) {
            setValues([ ...values, {
                id: getRandString(10),
                default: false,
                data: { id: null }
            } ]);
        }
    }

    const handleClearClick = (id: string) => {
        const value = values.filter(x => x.id === id)[0];
        setValues(values.filter(x => x.id !== value.id));
        if (value.data?.id != null && !removed.includes(value.data.id) && value.default === true) {
            setRemoved([ ...removed, value.data.id ]);
        }
    }

    const renderInput = (): JSX.Element => {
        return (
            <div className="field--multiple-els">
                { values.filter(x => !removed.includes(x.data?.id)).map((value, idx) => {
                    return (
                        <div className="field--multiple-el" key={idx}>
                            <div className="field--multiple-el-wrapper">
                                { props.children({ value:　value.data, id: value.id, index: idx }) }
                            </div>
                            <div className="field--multiple-el-clear">
                                <button type="button" onClick={() => handleClearClick(value.id)}>✕</button>
                            </div>
                        </div>
                    )
                }) }
            </div>
        )
    }

    return (
        <div className="field--multiple" ref={ref}>
            <div className="field--title">
                <span>{ props.title }</span>
            </div>
            { renderInput() }
            <div className="field--multiple-removed">
                { props.renderRemove && removed.map((el, idx) => {
                    return (
                        <div key={idx}>
                            {props.renderRemove?.call(null, { index: idx, value: el })}
                        </div>
                    )
                }) }
            </div>
            { props.maxLength == null || (props.maxLength != null && values.length < props.maxLength) ? <div className="field--multiple-btn">
                <StyledButton themes={[ "light" ]}>
                    <button type="button" onClick={() => appendItem()}>{ intl.formatMessage({ id: "field-mulitple.add", defaultMessage: "Add" }) }</button>
                </StyledButton>
            </div> : null }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default MultipleField;