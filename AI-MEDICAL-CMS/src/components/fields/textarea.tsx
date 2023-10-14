import * as React from "react";
import { useFormContext } from "react-hook-form";
import { getRandString, mergeRefs } from "../../helper";
import { TabViewContext } from "../tab-view";

export type TextareaFieldProps = Field & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    //
}

const TextareaField = React.forwardRef((props: TextareaFieldProps, ref: React.ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    const id = getRandString(10);
    const { unregister } = useFormContext() ?? {};
    const tabViewContext = React.useContext(TabViewContext);

    const filterProps = (props: any) => {
        const filter = new Set<keyof TextareaFieldProps>([ "errorMsg", "description" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof TextareaFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const renderInput = (): JSX.Element => {
        const filteredProps = filterProps(props);
        if (String.isNullOrWhitespace(filteredProps.className)) {
            filteredProps.className = "field--textarea-input";
        } else {
            filteredProps.className = [ ...filteredProps.className.split(" "), "field--textarea-input" ].join(" ");
        }
        return (
            <div className="field--container">
                { React.createElement("textarea", {
                    ...filteredProps,
                    ref: mergeRefs(ref),
                    id,
                    "aria-invalid": !!!props.errorMsg ? "false" : "true",
                    "aria-errormessage": `${id}-error-msg`
                }) }
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
            <div className="field--textarea">
                <label className="a11y" htmlFor={id}>{ props.placeholder }</label>
                { renderInput() }
                { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
            </div>
        )
    }
    return (
        <div className="field--textarea">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default TextareaField;