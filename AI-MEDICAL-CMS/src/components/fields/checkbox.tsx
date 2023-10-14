import * as React from "react";
import { useFormContext } from "react-hook-form";
import { getRandString } from "../../helper";
import { TabViewContext } from "../tab-view";

type CheckboxFieldOption = {
    label: string
    value: string
}

export type CheckboxFieldProps = Field & React.InputHTMLAttributes<HTMLInputElement> & {
    options: CheckboxFieldOption[]
    defaultValues?: string[]
    values?: string[]
}

const CheckboxField = React.forwardRef((props: CheckboxFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const { unregister } = useFormContext() ?? {};
    const tabViewContext = React.useContext(TabViewContext);

    const filterProps = (props: any) => {
        const filter = new Set<keyof CheckboxFieldProps>([ "errorMsg", "description", "options" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof CheckboxFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const checkDefaultChecked = (props: any, option: CheckboxFieldOption) => {
        if (props.defaultValues != null || props.defaultChecked != null) {
            if (props.defaultValues?.includes(option.value) || props.defaultChecked || props.defaultValue === option.value) {
                return true;
            }
            return false;
        }
        return undefined;
    }

    const checkChecked = (props: any, option: CheckboxFieldOption) => {
        if (props.values != null || props.checked != null) {
            if (props.values?.includes(option.value) || props.checked || props.value === option.value) {
                return true;
            }
            return false;
        }
        return undefined;
    }

    const renderInput = (): JSX.Element => {
        return (
            <div className="field--container">
                <fieldset>
                    <legend>{ props.title || props.placeholder }</legend>
                    { (props.options || []).map((option, idx) => {
                        const id = getRandString(10);
                        return (
                            <div className="field--checkbox-el" key={idx}>
                                <div className="field--checkbox-el-box">
                                    { React.createElement("input", {
                                        ...filterProps(props),
                                        type: "checkbox",
                                        value: option.value,
                                        id,
                                        ref: ref,
                                        defaultChecked: checkDefaultChecked(props, option),
                                        checked: checkChecked(props, option),
                                    }) }
                                    <div className="field--checkbox-el-box-fake"></div>
                                </div>
                                <label htmlFor={id}>{ option.label }</label>
                            </div>
                        )
                    }) }
                </fieldset>
                { tabViewContext?.activeLabel && <div className="field--label" field-label="">
                    { tabViewContext.activeLabel.name }
                </div> }
            </div>
        );
    }

    React.useEffect(() => {
        return () => unregister?.call(null, props.name);
    }, [ unregister, props.name ]);

    return (
        <div className="field--checkbox">
            { !String.isNullOrWhitespace(props.title) && <div className="field--title">
                <span>{ props.title }</span>
            </div> }
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default CheckboxField;