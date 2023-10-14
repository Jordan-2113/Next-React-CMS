import * as React from "react";
import SelectField from "./select";

export type SwitchCaseFieldProps = Field & React.SelectHTMLAttributes<HTMLSelectElement> & {
    //
}

const SwitchCaseField = React.forwardRef((props: React.PropsWithChildren<SwitchCaseFieldProps>, ref: React.ForwardedRef<HTMLSelectElement>): JSX.Element => {
    const [ current, setCurrent ] = React.useState<string | null>(null);
    const options: string[] = [];

    React.Children.forEach(props.children, child => {
        if (React.isValidElement(child) && child.props.name != null) {
            options.push(child.props.name);
        } else {
            throw new Error("SwitchCaseField: Child must be <CaseField />.");
        }
    })

    const filterProps = (props: any) => {
        const filter = new Set<keyof React.SelectHTMLAttributes<HTMLSelectElement>>([ "title", "onChange" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof React.SelectHTMLAttributes<HTMLSelectElement>)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setCurrent(e.target.value);
        props.onChange?.call(null, e);
    }

    const renderInput = (): JSX.Element => {
        return (
            <div className="switch-case--el">
                <div className="switch-case--el-select">
                    <SelectField { ...filterProps(props) } ref={ref} onChange={handleChange}>
                        { options.map(option => {
                            return (
                                <option value={option} key={option}>{ option }</option>
                            )
                        }) }
                    </SelectField>
                </div>
                <div className="switch-case--el-fields">
                    { React.Children.toArray(props.children).filter(child => React.isValidElement(child) && child.props.name === current).map((child, idx) => {
                        return (
                            <div className="switch-case--el-field" key={idx}>
                                { child }
                            </div>
                        )
                    }) }
                </div>
            </div>
        );
    }

    if (String.isNullOrWhitespace(props.title)) {
        return (
            <div className="switch-case">
                { renderInput() }
                {/* { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> } */}
            </div>
        )
    }
    return (
        <div className="switch-case">
            <div className="field--title">
                <span>{ props.title }</span>
            </div>
            { renderInput() }
            {/* { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> } */}
        </div>
    )
})

export const CaseField = (props: React.PropsWithChildren<{ name: string }>): JSX.Element => {
    return (
        <>
            { props.children }
        </>
    )
}

export default SwitchCaseField;