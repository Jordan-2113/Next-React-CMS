import * as React from "react";
import equal from "fast-deep-equal";
import { filterKeys, getUrlParams, keepKeys, serializeToQueryString } from "../helper";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type VariableScopeValuesType = { [key: string]: number | boolean | string | Array<number | boolean | string> };

type VariableScopeProps = {
    values: VariableScopeValuesType,
    pushOrReplaceValues: (values: VariableScopeValuesType) => void,
    removeValues: (keys: string[]) => void,
    reload: () => void
}

const VariableScope = React.createContext<VariableScopeProps>({
    values: {},
    pushOrReplaceValues: () => {},
    removeValues: () => {},
    reload: () => {}
});

export default VariableScope;

type VariableScopeProviderProps = {
    initialValues?: VariableScopeValuesType,
    extendQuery: boolean,
    included?: string[],
    children: ((values: VariableScopeProps) => React.ReactNode | undefined) | React.ReactNode | undefined
}

export const VariableScopeProvider = (props: VariableScopeProviderProps):JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = getUrlParams(location.search?.substring(1) || "");
    const [ values, _setValues ] = React.useState({
        ...(props.extendQuery === true ? props.included != null ? keepKeys(params, props.included) : params : null),
        ...props.initialValues
    });
    const valuesRef = React.useRef<VariableScopeValuesType | null>(null);
    valuesRef.current = values;

    const pushOrReplaceValues = (values: VariableScopeValuesType): void => {
        const newValues: VariableScopeValuesType = {
            ...valuesRef.current,
            ...values
        };

        if (!equal(valuesRef.current, newValues)) {
            _setValues(newValues);
            if (props.extendQuery) {
                navigate({
                    pathname: location.pathname,
                    search: "?"+serializeToQueryString({
                        ...getUrlParams(location.search.substring(1)),
                        ...newValues
                    })
                });
            }
        }
    }

    const removeValues = (keys: string[]): void => {
        const newValues: VariableScopeValuesType = filterKeys(valuesRef.current || {}, keys);

        if (!equal(valuesRef.current, newValues)) {
            _setValues(newValues);
            if (props.extendQuery) {
                navigate(`${location.pathname}?${serializeToQueryString({
                    ...getUrlParams(location.search.substring(1)),
                    ...newValues
                })}`);
            }
        }
    }

    const reload = (): void => {
        _setValues({ ...valuesRef.current });
    }

    React.useEffect(() => {
        if (props.extendQuery) {
            const _params = getUrlParams(location.search?.substring(1) || "");
            const newValues = props.included != null ? keepKeys(_params, props.included) : _params;
            if (!equal(valuesRef.current, newValues)) {
                _setValues(newValues);
            }
        }
    }, [ location, location.search, props.extendQuery, props.included ]);

    return (
        <VariableScope.Provider value={{ values, pushOrReplaceValues, removeValues, reload }}>
            { typeof props.children === "function" ? props.children({ values, pushOrReplaceValues, removeValues, reload }) : props.children }
        </VariableScope.Provider>
    )
}

export const ScopeReloadButton = (): JSX.Element => {
    const scope = React.useContext(VariableScope);

    const handleClick = () => {
        scope.reload();
    }

    return (
        <div style={{ display: "inline-table", verticalAlign: "middle", height: "100%", margin: "0 5px" }}>
            <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                <FontAwesomeIcon icon={['fas', 'sync-alt']} style={{ cursor: "pointer" }} onClick={handleClick} />
            </div>
        </div>
    )
}