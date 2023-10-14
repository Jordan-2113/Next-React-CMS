import * as React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import zhTW from "date-fns/locale/zh-TW";
import { getRandString, mergeRefs } from "../../helper";

import "react-datepicker/dist/react-datepicker.min.css";
import MaskedInput, { Mask } from "react-text-mask";
import { TabViewContext } from "../tab-view";
import { useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";

registerLocale("zhTW", zhTW);

export type TimeFieldProps = Field & React.InputHTMLAttributes<HTMLInputElement> & {
    format?: string,
    filterDate?(date: Date): boolean
}

const TimeField = React.forwardRef((props: TimeFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const intl = useIntl();
    const id = getRandString(10);
    const { unregister } = useFormContext() ?? {};
    const tabViewContext = React.useContext(TabViewContext);
    const [ date, setDate ] = React.useState<Date | null>(String.isNullOrWhitespace(props.value?.toString()) ? null : new Date(props.value as string));

    const filterProps = (props: any) => {
        const filter = new Set<keyof TimeFieldProps>([ "errorMsg", "description", "format" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof TimeFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const formatToMask = (format?: string): Mask | ((value: string) => Mask) => {
        if (format == null) return [];

        const mask: Array<string | RegExp> | boolean = [];
        for (var i = 0; i < format.length; i++) {
            if (/(h|m)/i.test(format.charAt(i))) {
                mask.push(/\d/);
            } else {
                mask.push(format.charAt(i));
            }
        }

        return mask;
    }

    const renderInput = (): JSX.Element => {
        const format = props.format ?? "HH:mm";
        const filteredProps = filterProps(props);
        if (String.isNullOrWhitespace(filteredProps.className)) {
            filteredProps.className = "field--time-el-input";
        } else {
            filteredProps.className = [ ...filteredProps.className.split(" "), "field--time-input" ].join(" ");
        }
        return (
            <div className="field--container field--time-el">
                <DatePicker
                    locale="zhTW"
                    dateFormat={format}
                    selected={date}
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    showPopperArrow={false}
                    timeCaption={props.title ?? intl.formatMessage({ id: "field-time.time", defaultMessage: "Time" })}
                    customInput={<MaskedInput
                        mask={formatToMask(format)}
                        render={(renderRef, renderProps) => {
                            return (
                                <>
                                    <div className="field--time-el-placeholder">&nbsp;</div>
                                    {React.createElement(
                                        "input",
                                        {
                                            ...renderProps,
                                            ...filteredProps,
                                            ref: mergeRefs(renderRef, ref),
                                            id,
                                            "aria-invalid": !!!props.errorMsg ? "false" : "true",
                                            "aria-errormessage": `${id}-error-msg`
                                        }
                                    )}
                                </>
                            )
                        }}
                    />}
                    onChange={date => setDate(date as Date)}
                />
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
            <div className="field--time">
                <label className="a11y" htmlFor={id}>{ props.placeholder }</label>
                { renderInput() }
                { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
            </div>
        )
    }
    return (
        <div className="field--time">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default TimeField;