import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import { getRandString, mergeRefs } from "../../helper";
import { TabViewContext } from "../tab-view";

export type SelectFieldProps = Field & React.SelectHTMLAttributes<HTMLSelectElement> & {
    placeholder?: string,
    defaultDisabled?: boolean
}

const SelectField = React.forwardRef((props: SelectFieldProps, ref: React.ForwardedRef<HTMLSelectElement>): JSX.Element => {
    const intl = useIntl();
    const { unregister } = useFormContext() ?? {};
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const placeholderRef = React.useRef<HTMLDivElement>(null);
    const id = getRandString(10);
    const tabViewContext = React.useContext(TabViewContext);

    React.useEffect(() => {
        setPlaceholder(selectRef.current);
    }, []);

    const filterProps = (props: any) => {
        const filter = new Set<keyof SelectFieldProps>([ "errorMsg", "placeholder", "description", "defaultDisabled" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof SelectFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const setPlaceholder = (select: HTMLSelectElement | undefined | null) => {
        if (select == null) return;
        if (placeholderRef.current != null) {
            placeholderRef.current.innerHTML = select.options[select.selectedIndex].innerText;
        }
    }

    const handleSelectOnchange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setPlaceholder(e.target);
    }

    const renderInput = (): JSX.Element => {
        return (
            <div className="field--container field--dropdown-el">
                { React.createElement(
                    "select",
                    {
                        ...filterProps(props),
                        ref: mergeRefs(ref, selectRef),
                        id,
                        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                            handleSelectOnchange(e);
                            props.onChange?.call(null, e);
                        },
                        "aria-invalid": !!!props.errorMsg ? "false" : "true",
                        "aria-errormessage": `${id}-error-msg`
                    },
                    <option value="" disabled={props.defaultDisabled ?? false}>{ intl.formatMessage({ id: "field-select.select", defaultMessage: "Select" }) }</option>, props.children
                ) }
                <div className="field--dropdown-label" ref={placeholderRef}></div>
                <svg viewBox="0 0 23 23" className="field--dropdown-icon">
                    <path strokeWidth="3" strokeLinecap="round" d="M 3 6 L 10 13" />
                    <path strokeWidth="3" strokeLinecap="round" d="M 10 13 L 17 6" />
                </svg>
                { tabViewContext?.activeLabel && <div className="field--label" field-label="">
                    { tabViewContext.activeLabel.name }
                </div> }
            </div>
        );
    }

    React.useEffect(() => {
        return () => unregister?.call(null, props.name);
    }, [ unregister, props.name ]);

    if (String.isNullOrWhitespace(props.title)) {
        return (
            <div className="field--dropdown">
                <label className="a11y" htmlFor={id}>{ props.placeholder }</label>
                { renderInput() }
                { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
            </div>
        )
    }
    return (
        <div className="field--dropdown">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default SelectField;