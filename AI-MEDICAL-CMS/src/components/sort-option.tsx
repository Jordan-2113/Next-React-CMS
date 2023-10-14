import * as React from "react";
import { useIntl } from "react-intl";
import VariableScope from "./variable-scope";

export type SortOptionProps = {
    options: { id: string, label: string }[]
}

const SortOption = (props: SortOptionProps): JSX.Element => {
    const intl = useIntl();
    const { values: params, pushOrReplaceValues } = React.useContext(VariableScope);

    const handleClick = (e: React.MouseEvent, id: string, order: string): void => {
        e.preventDefault();
        pushOrReplaceValues({ di: id, sort: order });
    }
    
    return (
        <div className="sorter">
            <div className="sorter--wrapper">
                <div className="sorter--title">{ intl.formatMessage({ id: "sort-option.order-label", defaultMessage: "Sort: " }) }</div>
                <div className="sorter--controls">
                    { props.options.map((option, idx) => {
                        return (
                            <div key={idx} className="sorter--control">
                                <button
                                    type="button"
                                    data-order={params.di === option.id ? params.sort : ""}
                                    onClick={e => handleClick(e, option.id, params.di === option.id ? params.sort === "asc" ? "desc" : "asc" : "asc")}
                                >
                                    <span>{ option.label }</span>
                                </button>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

export default SortOption;