import * as React from "react";

export type GridProps = {
    padding?: number,
    breakpoint?: number
}

const GridContext = React.createContext<{ padding?: number }>({ padding: undefined });

const Grid = (props: React.PropsWithChildren<GridProps>): JSX.Element => {
    const builtStyles = React.useMemo(() => {
        if (props.padding == null) {
            return {
                gridTemplateColumns: `repeat(auto-fill, minmax(${props.breakpoint == null ? 330 : props.breakpoint}px, 1fr))`
            }
        }
        return {
            padding: props.padding * -1,
            gridTemplateColumns: `repeat(auto-fill, minmax(${props.breakpoint == null ? 330 : props.breakpoint}px, 1fr))`
        }
    }, [ props.breakpoint, props.padding ]);

    return (
        <GridContext.Provider value={{ padding: props.padding }}>
            <div className={`grid`} style={props.padding ? { margin: props.padding * -1 } : undefined}>
                <div className="grid--wrapper" style={builtStyles}>
                    { props.children }
                </div>
            </div>
        </GridContext.Provider>
    )
}

export const GridItem = (props: React.PropsWithChildren<{}>) => {
    const context = React.useContext(GridContext);

    return (
        <div className="grid--item" style={context.padding == null ? undefined : { padding: context.padding }}>
            { props.children }
        </div>
    )
}

export default Grid;