import copy from "fast-copy";
import equal from "fast-deep-equal";
import * as React from "react";
import { useIntl } from "react-intl";
import { getRandString } from "../helper";
import { CheckboxField } from "./fields";
import { MainPanelContext } from "./main-panel";
import StyledButton from "./styled-button";

type BulkSelectBarContextType = {
    ids: string[],
    registeredIds: string[],
    push(id: string): void,
    pop(id: string): void,
    pushAll(ids: string[]): void,
    popAll(ids: string[]): void,
    toggle(id: string): void,
    registerId(id: string): void,
    unregisterId(id: string): void
}

const BulkSelectBarContext = React.createContext<BulkSelectBarContextType>({
    ids: [],
    registeredIds: [],
    push: () => {},
    pop: () => {},
    pushAll: () => {},
    popAll: () => {},
    toggle: () => {},
    registerId: () => {},
    unregisterId: () => {}
});

type BulkSelectBarProps = {
    template: string,
    actions: {
        onClick: (ids: string[]) => void,
        label: string,
        requiredConfirm?: boolean
    }[]
}

const BulkSelectBar = (props: React.PropsWithChildren<BulkSelectBarProps>): JSX.Element => {
    const key = React.useMemo(() => getRandString(5), []);
    const intl = useIntl();
    const panelContext = React.useContext(MainPanelContext);
    const [ ids, setIds ] = React.useState<string[]>([]);
    const [ registeredIds, setRegisteredIds ] = React.useState<string[]>([]);
    const elRef = React.useRef<HTMLDivElement>(null);
    const idsRef = React.useRef<string[]>([]);
    idsRef.current = ids;

    const getConfirmMsg = (label: string) => {
        return intl.formatMessage({ id: "bulk-select-bar.confirm-action", defaultMessage: "Do you want to execute `{label}`?"}, { label });
    }

    React.useEffect(() => {
        if (ids.length > 0 && elRef.current !== null) {
            panelContext.setBottomBufferSize(key, elRef.current.clientHeight);
        } else {
            panelContext.setBottomBufferSize(key, 0);
        }
    }, [ panelContext, ids, key ]);

    const push = (id: string): void => {
        if (id == null || ids.includes(id)) return;
        const nIds = copy(ids);
        nIds.push(id);
        setIds(nIds);
    }

    const pushAll = (ids: string[]): void => {
        if (equal(ids, [ ...ids, ...ids ])) return;
        const nIds = copy(ids);
        ids.forEach(id => {
            if (id != null && !nIds.includes(id)) {
                nIds.push(id);
            }
        });
        setIds(nIds);
    }

    const pop = (id: string): void => {
        if (id == null || !ids.includes(id)) return;
        const nIds = copy(ids);
        setIds(nIds.filter(x => x !== id));
    }

    const popAll = (ids: string[]): void => {
        if (equal(ids.filter(el => !ids.includes(el)), idsRef)) return;
        const nIds = ids.filter(el => !ids.includes(el));
        setIds(nIds);
    }

    const toggle = (id: string): void => {
        if (id == null) {
            return;
        }
        if (ids.includes(id)) {
            pop(id);
        } else {
            push(id);
        }
    }

    const clear = (): void => {
        setIds([]);
    }
    
    const registerId = (id: string): void => {
        if (id != null && !registeredIds.includes(id)) {
            setRegisteredIds(state => [ ...state, id ]);
        }
    }
    
    const unregisterId = (id: string): void => {
        if (id != null && registeredIds.includes(id)) {
            setRegisteredIds(state => state.filter(x => x !== id));
        }
    }

    const handleClearButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        clear();
    }

    return (
        <BulkSelectBarContext.Provider value={{ ids: idsRef.current, push, pushAll, pop, popAll, toggle, registeredIds, registerId, unregisterId }}>
            { props.children }
            <div className={`bulk-select-bar${ids.length>0?" show":""}`} ref={elRef}>
                <div className="bulk-select-bar--wrapper">
                    <div className="bulk-select-bar--options">
                        <div className="bulk-select-bar--clear"><button type="button" onClick={handleClearButtonClick}>✕</button></div>
                        { props.actions.map((action, idx) => {
                            return (
                                <div className="bulk-select-bar--option" key={idx}>
                                    <StyledButton themes={["light"]}>
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                if (window.confirm(getConfirmMsg(action.label))) {
                                                    action.onClick?.call(null, copy(idsRef.current));
                                                }
                                            }}
                                        >
                                            { action.label }
                                        </button>
                                    </StyledButton>
                                </div>
                            )
                        }) }
                        <div className="bulk-select-bar--label">{ props.template.replace("{0}", ids.length.toString()) }</div>
                    </div>
                </div>
            </div>
        </BulkSelectBarContext.Provider>
    )
}

type BaseBulkSelectBarItemType = {
    itemId: string
}

type BulkSelectBarItemType = BaseBulkSelectBarItemType & {}

export const BulkSelectBarItem = (props: React.PropsWithChildren<BulkSelectBarItemType>): JSX.Element => {
    const context = React.useContext<BulkSelectBarContextType>(BulkSelectBarContext);
    const elRef = React.useRef<HTMLElement | null>(null);

    if (React.Children.count(props.children) > 1) {
        throw new Error("BulkSelectBarItem: Only accept one child");
    }

    const handleClick = React.useCallback(() => {
        context.toggle(props.itemId);
    }, [ context, props.itemId ]);

    React.useEffect(() => {
        if (elRef.current !== null) {
            if (!elRef.current.classList.contains("bulk-select-bar--selectable")) {
                elRef.current.classList.add("bulk-select-bar--selectable")
            }
            if (context.ids.includes(props.itemId)) {
                elRef.current.classList.add("bulk-select-bar--selected");
            } else {
                elRef.current.classList.remove("bulk-select-bar--selected");
            }
        }
    }, [ context.ids, props.itemId ]);

    React.useEffect(() => {
        if (!context.registeredIds.includes(props.itemId)) {
            context.registerId(props.itemId);
        }
        return () => context.unregisterId(props.itemId);
    }, [ context, props.itemId ]);

    return (
        <>
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ref: (el: HTMLElement) => elRef.current = el,
                        onClick: handleClick
                    });
                }
                return child;
            })}
        </>
    )
}

type BulkSelectBarCheckboxType = BaseBulkSelectBarItemType & {
    selectAll?: boolean
}

export const BulkSelectBarCheckbox = (props: BulkSelectBarCheckboxType): JSX.Element => {
    const context = React.useContext<BulkSelectBarContextType>(BulkSelectBarContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.selectAll) {
            const containsAll = context.ids.length > 0 && context.ids.every(v => context.registeredIds.includes(v));
            if (containsAll) {
                context.popAll(context.registeredIds);
            } else {
                context.pushAll(context.registeredIds);
            }
        } else {
            if (e.target.checked) {
                context.push(props.itemId);
            } else {
                context.pop(props.itemId);
            }
        }
    }

    React.useEffect(() => {
        if (!context.registeredIds.includes(props.itemId)) {
            context.registerId(props.itemId);
        }
        return () => context.unregisterId(props.itemId);
    }, [ context, props.itemId ]);

    const checked = () => {
        if (props.selectAll) {
            return context.ids.length >= context.registeredIds.length && context.ids.every(v => context.registeredIds.includes(v));
        } else {
            return context.ids.includes(props.itemId);
        }
    }

    return (
        <CheckboxField onChange={handleChange} values={checked() ? [""] : []} options={[ { label: "", value: "" } ]} />
    )
}

export default BulkSelectBar;