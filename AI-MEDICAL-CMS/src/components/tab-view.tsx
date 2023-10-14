import * as React from "react";

type TabViewLabelType = {
    id: string,
    name: string
}

type TabViewContextProps = {
    activeId?: string,
    activeLabel?: TabViewLabelType,
    setActiveId(id: string): void,
    labels: TabViewLabelType[]
}

const TabViewContext = React.createContext<TabViewContextProps>({
    activeId: undefined,
    activeLabel: undefined,
    labels: [],
    setActiveId: () => {}
});

export type TabViewProps = {
    renderInvisibleEl?: boolean,
    initialView?: string,
    labels: {
        id: string,
        name: string
    }[]
}

const TabView = (props: React.PropsWithChildren<TabViewProps>): JSX.Element => {
    const [ activeId, setActiveId ] = React.useState<string | undefined>(props.initialView);
    const getActiveLabel = React.useMemo<TabViewLabelType | undefined>(() => {
        if (props.labels == null) {
            return undefined;
        }
        const result = props.labels.filter(x => x.id === activeId);
        if (result.length === 0) {
            return undefined;
        }
        return result[0];
    }, [ props.labels, activeId ]);

    if (activeId != null) {
        if (props.labels == null || props.labels.filter(x => x.id === activeId).length === 0) {
            throw new Error("TabView: initialView not match with label");
        }
    }

    return (
        <TabViewContext.Provider value={{ activeId, setActiveId, labels: props.labels ?? [], activeLabel: getActiveLabel }}>
            { props.children }
        </TabViewContext.Provider>
    )
}

const TabViewBtnRow = (props: React.PropsWithChildren<{ inline?: boolean }>): JSX.Element => {
    return (
        <div className={`tab-view--controls${props.inline?" inline":""}`}>
            { React.Children.map(props.children, child => {
                return (
                    <div className="tab-view--control">
                        { child }
                    </div>
                )
            }) }
        </div>
    )
}

const TabViewBtn = (props: { for: string }): JSX.Element => {
    const context = React.useContext<TabViewContextProps>(TabViewContext);

    const label = context.labels.filter(x => x.id === props.for);

    if (label.length === 0) {
        throw new Error(`TabViewBtn: label '${props.for}' not found in TabViewContext`);
    }

    return (
        <button className={`tab-view--control-btn${context.activeId === props.for ? " active" : ""}`} type="button" onClick={() => context.setActiveId(props.for)}>
            { label[0].name }
        </button>
    )
}

const TabViewEl = (props: React.PropsWithChildren<{ id: string }>): JSX.Element => {
    const context = React.useContext<TabViewContextProps>(TabViewContext);

    return (
        <div style={{ display: props.id === context.activeId ? "block" : "none", flex: "0 1 100%", maxWidth: "100%" }}>
            { props.children }
        </div>
    )
}

export { TabView, TabViewBtnRow, TabViewBtn, TabViewEl, TabViewContext };