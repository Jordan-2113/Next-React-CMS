import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { FieldValues, FormState, useForm, UseFormGetValues, UseFormRegister, UseFormReset, UseFormUnregister, UseFormWatch } from "react-hook-form";
import { useIntl } from "react-intl";
import { SelectField, TextField } from "./fields";
import Form from "./form";
import { PopupSidePanelContext } from "./popup-side-panel";
import StyledButton, { StyledButtonRow, StyledButtonRowItem } from "./styled-button";
import VariableScope from "./variable-scope";

export type SearchProps = {
    types: { key: string, label: string }[],
    children?(values: {
        register: UseFormRegister<FieldValues>,
        state: FormState<FieldValues>,
        getValues: UseFormGetValues<FieldValues>,
        unregister: UseFormUnregister<FieldValues>,
        watch: UseFormWatch<FieldValues>,
        reset: UseFormReset<FieldValues>
    }, params: { [key: string]: string | number | boolean | Array<string | number | boolean> }): React.ReactElement<HTMLElement>
}

const Search = (props: SearchProps): JSX.Element => {
    const PANEL_FILTER_CONST = "#search-filter";
    const intl = useIntl();
    const popupSidePanel = React.useContext(PopupSidePanelContext);
    const { values: params, pushOrReplaceValues, removeValues } = React.useContext(VariableScope);
    const hookForm = useForm();
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleFormSubmit = React.useCallback((data: FieldValues) => {
        pushOrReplaceValues(data);
    }, [ pushOrReplaceValues ]);

    const handleQueryBtnClearClick = (e: React.MouseEvent<HTMLButtonElement>, values: FieldValues, reset: UseFormReset<FieldValues>) => {
        e.preventDefault();
        reset();
        removeValues(Object.keys(values));
        popupSidePanel.remove(PANEL_FILTER_CONST);
    }

    const renderFilter = (): JSX.Element => {
        return (
            <Form onSubmit={handleFormSubmit} shouldUnregister={true}>
                {value => (
                    <>
                        { props.children?.call(null, value, params) }
                        <div className="search--filter-btn-row">
                            <StyledButtonRow>
                                <StyledButtonRowItem>
                                    <StyledButton themes={[ 'normal' ]}>
                                        <button onClick={() => popupSidePanel.remove(PANEL_FILTER_CONST)}>
                                            { intl.formatMessage({ id: "search.filter", defaultMessage: "Filter" }) }
                                        </button>
                                    </StyledButton>
                                </StyledButtonRowItem>
                                <StyledButtonRowItem>
                                    <StyledButton themes={[ 'normal' ]}>
                                        <button onClick={e => handleQueryBtnClearClick(e, value.getValues(), value.reset)}>
                                            { intl.formatMessage({ id: "search.clear", defaultMessage: "Clear" }) }
                                        </button>
                                    </StyledButton>
                                </StyledButtonRowItem>
                            </StyledButtonRow>
                        </div>
                    </>
                )}
            </Form>
        )
    }

    // handle form enter key submit manunal
    React.useEffect(() => {
        const form = formRef.current;
        const listener = (e: KeyboardEvent) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                e.preventDefault();
                hookForm.handleSubmit(handleFormSubmit)();
            }
        }
        if (form != null) {
            form.addEventListener("keydown", listener);
        }
        return () => form?.removeEventListener("keydown", listener);
    }, [ hookForm, handleFormSubmit ]);

    return (
        <div className="search">
            <div className="search--wrapper">
                { props.children != null && <button
                    type="button"
                    className="search--filter"
                    onClick={() => popupSidePanel.push(
                        PANEL_FILTER_CONST,
                        intl.formatMessage({ id: "search.detail-filter", defaultMessage: "Detail Filter" }),
                        renderFilter(),
                        "right"
                    )}
                >
                    <FontAwesomeIcon icon={['fas', 'filter']} />
                    <div className="a11y">{ intl.formatMessage({ id: "search.detail-filter", defaultMessage: "Detail Filter" }) }</div>
                </button> }
                <div className="search--form">
                    <Form form={hookForm} onSubmit={handleFormSubmit} ref={formRef}>
                        { ({ register, state: { errors }, getValues, unregister, reset }) => {
                            return (
                                <>
                                    <div className="search--form-wrapper">
                                        <div className="search--form-type">
                                            <SelectField
                                                defaultValue={params.type?.toString() ?? ""}
                                                { ...register("type", {
                                                    required: true,
                                                    shouldUnregister: true
                                                }) }
                                            >
                                                { props.types.map((type, idx) => (<option key={idx} value={type.key}>{ type.label }</option>)) }
                                            </SelectField>
                                        </div>
                                        <div className="search--form-value">
                                            <TextField
                                                { ...register("q", {
                                                    shouldUnregister: true
                                                }) }
                                                defaultValue={params.q?.toString() ?? ""}
                                                placeholder={ intl.formatMessage({ id: "search.search", defaultMessage: "Search" }) }
                                            />
                                            { params.q?.toString().length > 0 && <button
                                                className="search--form-value-clear"
                                                onClick={e => handleQueryBtnClearClick(e, getValues(), reset)}
                                            >✕</button> }
                                        </div>
                                        <div className="search--form-submit">
                                            <StyledButton>
                                                <button type="submit">
                                                    <FontAwesomeIcon icon={[ "fas", "search" ]} />
                                                    <div className="a11y">{ intl.formatMessage({ id: "search.search", defaultMessage: "Search" }) }</div>
                                                </button>
                                            </StyledButton>
                                        </div>
                                    </div>
                                    <input type="hidden" name="p" value="1" />
                                </>
                            )
                        } }
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Search;