import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import { getRandString, mergeRefs } from "../../helper";
import { TabViewContext } from "../tab-view";

export type FileFieldProps = Field & React.InputHTMLAttributes<HTMLInputElement> & {
    showExtesion?: boolean
}

const FileField = React.forwardRef((props: FileFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const intl = useIntl();
    const { unregister } = useFormContext() ?? {};
    const inputRef = React.useRef<HTMLInputElement>(null);
    const labelRef = React.useRef<HTMLDivElement>(null);
    const id = getRandString(10);
    const tabViewContext = React.useContext(TabViewContext);

    const filterProps = (props: any) => {
        const filter = new Set<keyof FileFieldProps>([ "errorMsg", "description", "showExtesion" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof FileFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const field = e.target as HTMLInputElement;
        if (field.value === "" || field.files?.length === 0) {
            if (labelRef.current != null) {
                labelRef.current.innerHTML = props.placeholder ?? intl.formatMessage({ id: "field-file.select", defaultMessage: "Select" });
            }
            return;
        }
        const paths = Array.from(field.files ?? []).map(file => {
            if (props.showExtesion) {
                return file.name;
            }
            const arr = file.name.split(".");
            if (arr.length >= 2) arr.pop();
            return arr.join(".");
        })
        if (labelRef.current != null) {
            labelRef.current.innerHTML = paths.join(", ");
        }
    }

    const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        inputRef.current?.click();
    }

    const renderInput = (): JSX.Element => {
        const filteredProps = filterProps(props);
        if (String.isNullOrWhitespace(filteredProps.className)) {
            filteredProps.className = "field--file-input";
        } else {
            filteredProps.className = [ ...filteredProps.className.split(" "), "field--file-input" ].join(" ");
        }
        return (
            <div className="field--container">
                <div className="field--file-el">
                    { React.createElement(
                        "input",
                        {
                            ...filteredProps,
                            ref: mergeRefs(ref, inputRef),
                            id,
                            type: "file",
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                                props.onChange?.call(null, e);
                            },
                            "aria-invalid": !!!props.errorMsg ? "false" : "true",
                            "aria-errormessage": `${id}-error-msg`
                        }
                    ) }
                    <div className="field--file-el-label" ref={labelRef} onClick={handleLabelClick}>
                        { props.placeholder ?? intl.formatMessage({ id: "field-file.select", defaultMessage: "Select" }) }
                    </div>
                </div>
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
            <div className="field--file">
                <label className="a11y" htmlFor={id}>{ props.placeholder }</label>
                { renderInput() }
                { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
            </div>
        )
    }
    return (
        <div className="field--file">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default FileField;