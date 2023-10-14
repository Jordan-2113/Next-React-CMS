import * as React from "react";

type PopupSidePanelContextType = {
    ids: string[],
    push: (id: string, title: string, contents: JSX.Element, direction: "left" | "right") => void;
    remove: (id: string) => boolean;
    clear: () => void;
}

type PopupSidePanelEl = {
    id: string,
    title: string,
    contents: JSX.Element,
    display: boolean,
    direction: "left" | "right"
}

export const PopupSidePanelContext = React.createContext<PopupSidePanelContextType>({
    ids: [],
    push: () => {},
    remove: _ => false,
    clear: () => {}
});

const PopupSidePanelProvider = (props: React.PropsWithChildren<{}>): JSX.Element => {
    const [ els, setEls ] = React.useState<PopupSidePanelEl[]>([]);
    const elsRef = React.useRef<PopupSidePanelEl[]>([]);
    const elRemoveTimeouts = React.useRef<{ [key: string]: number }>({});
    elsRef.current = els;

    React.useEffect(() => {
        if (els.length > 0) {
            document.querySelector("#root")?.classList.add("popup-side-panel--blur");
        } else {
            document.querySelector("#root")?.classList.remove("popup-side-panel--blur");
        }
    }, [ els ]);

    const push = (id: string, title: string, contents: JSX.Element, direction: "left" | "right" = "right"): void => {
        if (id == null) {
            return;
        }
        if (elRemoveTimeouts.current.hasOwnProperty(id)) {
            window.clearTimeout(elRemoveTimeouts.current[id]);
        }
        setEls([
            ...elsRef.current.filter(x => x.id !== id),
            {
                id, title, contents, display: true, direction
            }
        ])
    }

    const remove = (id: string): boolean => {
        if (id == null) {
            return false;
        }
        const afterRemovedEls = elsRef.current.filter(x => x.id !== id);
        if (elsRef.current.length !== afterRemovedEls.length) {
            setEls(elsRef.current.map(x => {
                if (x.id === id) {
                    x.display = false;
                }
                return x;
            }))
            elRemoveTimeouts.current[id] = window.setTimeout(() => {
                setEls(afterRemovedEls);
                delete elRemoveTimeouts.current[id];
            }, 300);
            return true;
        }
        return false;
    }

    const clear = (): void => {
        setEls([]);
    }

    return (
        <PopupSidePanelContext.Provider value={{ ids: els.map(el => el.id), push, remove, clear }}>
            { props.children }
            { els.map((el, idx) => {
                return (
                    <PopupSidePanel
                        key={idx}
                        id={el.id}
                        title={el.title}
                        contents={el.contents}
                        display={el.display}
                        direction={el.direction}
                    />
                )
            }) }
        </PopupSidePanelContext.Provider>
    )
}

const PopupSidePanel = (props: PopupSidePanelEl) => {
    const parent = React.useContext(PopupSidePanelContext);
    const panelRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setTimeout(() => {
            if (props.display) {
                panelRef.current?.classList.add("show");
            } else {
                panelRef.current?.classList.remove("show");
            }
        }, 1);
    }, [ props.display ]);

    const handleClose = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!parent.remove(props.id)) {
            console.error("PopupSidePanel: Cannot remove element.");
        }
    }

    return (
        <div className="popup-side-panel" ref={panelRef} data-popup-side-panel={props.id}>
            <div className="popup-side-panel--bg" onClick={handleClose}></div>
            <div className={`popup-side-panel--wrapper ${props.direction}`}>
                <div className="popup-side-panel--head">
                    <div className="popup-side-panel--title">{ props.title }</div>
                    <div className="popup-side-panel--close"><button type="button" onClick={handleClose}>✕</button></div>
                </div>
                <div className="popup-side-panel--scrollable">
                    <div className="popup-side-panel--body">
                        <div className="popup-side-panel--body-wrapper">
                            { props.contents }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupSidePanelProvider;