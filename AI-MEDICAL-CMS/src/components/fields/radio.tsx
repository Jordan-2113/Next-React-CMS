import * as React from "react";
import { useFormContext } from "react-hook-form";
import { getRandString } from "../../helper";
import { TabViewContext } from "../tab-view";

type RadioFieldOption = {
    label: string
    value: string
}

export type RadioFieldProps = Field & React.InputHTMLAttributes<HTMLInputElement> & {
    options: RadioFieldOption[]
}

const RadioField = React.forwardRef((props: RadioFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const { unregister } = useFormContext() ?? {};
    const [ value, setValue ] = React.useState<string>(props.value?.toString() ?? props.defaultValue?.toString() ?? '');
    const tabViewContext = React.useContext(TabViewContext);

    const filterProps = (props: any) => {
        const filter = new Set<keyof RadioFieldProps>([ "errorMsg", "options", "description" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof RadioFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }

    const renderInput = (): JSX.Element => {
        return (
            <div className="field--container">
                <fieldset>
                    <legend>{ props.title || props.placeholder }</legend>
                    { (props.options || []).map((option, idx) => {
                        const id = getRandString(10);
                        return (
                            <div className="field--radio-el" key={idx}>
                                <div className="field--radio-el-box">
                                    { React.createElement(
                                        "input",
                                        {
                                            ...filterProps(props),
                                            type: "radio",
                                            value: option.value,
                                            id,
                                            ref: ref,
                                            checked: value === option.value,
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                handleChange(e);
                                                props.onChange?.call(null, e);
                                            }
                                        }
                                    ) }
                                    <div className="field--radio-el-box-fake"></div>
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
        <div className="field--radio">
            { !String.isNullOrWhitespace(props.title) && <div className="field--title">
                <span>{ props.title }</span>
            </div> }
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default RadioField;