import * as React from "react";

const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];

const RowContext = React.createContext<{ gutterWidth: number, includeYAxisPadding: boolean }>({
    gutterWidth: 30,
    includeYAxisPadding: false
});

export type RowProps = {
    gutterWidth?: number;
    includeYAxisPadding?: boolean;
    xs?: number | { cols?: number };
    sm?: number | { cols?: number };
    md?: number | { cols?: number };
    lg?: number | { cols?: number };
    xl?: number | { cols?: number };
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(({
    gutterWidth = 30,
    includeYAxisPadding = false,
    ...props
}: React.PropsWithChildren<RowProps>, ref): JSX.Element => {
    const classes = [ 'layout--row' ];

    breakpoints.forEach(breakpoint => {
        const propValue = (props as any)[breakpoint];
  
        let cols;
        if (propValue != null && typeof propValue === 'object') {
          ({ cols } = propValue);
        } else {
          cols = propValue;
        }
  
        const infix = breakpoint !== 'xs' ? `-${breakpoint}` : '';
  
        if (cols != null) classes.push(`layout--row-cols${infix}-${cols}`);
      });
  

    return (
        <RowContext.Provider value={{ gutterWidth, includeYAxisPadding }}>
            <div
                className={classes.join(' ')}
                ref={ref}
                style={includeYAxisPadding ? {
                    margin: -gutterWidth / 2
                } : {
                    marginLeft: -gutterWidth / 2,
                    marginRight: -gutterWidth / 2
                }}
            >
                { props.children }
            </div>
        </RowContext.Provider>
    );
});

type ColOrder = 'first' | 'last' | number;
type ColSize = boolean | number | 'auto';
export type ColProps = {
    // breakpoints refer _variables -> $grid-breakpoints
    xs?: ColSize | { span?: ColSize; offset?: number; order?: ColOrder };
    sm?: ColSize | { span?: ColSize; offset?: number; order?: ColOrder };
    md?: ColSize | { span?: ColSize; offset?: number; order?: ColOrder };
    lg?: ColSize | { span?: ColSize; offset?: number; order?: ColOrder };
    xl?: ColSize | { span?: ColSize; offset?: number; order?: ColOrder };
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props: React.PropsWithChildren<ColProps>, ref): JSX.Element => {
    const context = React.useContext(RowContext);
    const classes: string[] = [ 'layout--col' ];
    
    breakpoints.forEach(breakpoint => {
        const propValue = (props as any)[breakpoint];

        let span: ColSize | undefined;
        let offset: number | undefined;
        let order: ColOrder | undefined;

        if (typeof propValue === 'object' && propValue != null) {
          ({ span = true, offset, order } = propValue);
        } else {
          span = propValue;
        }

        const infix = breakpoint !== 'xs' ? `-${breakpoint}` : '';

        if (span){
            classes.push(span === true ? `layout--col${infix}` : `layout--col${infix}-${span}`);
        }
        
        if (order != null) classes.push(`layout--order${infix}-${order}`);
        if (offset != null) classes.push(`layout--offset${infix}-${offset}`);
    });

    return (
        <div
            className={classes.join(' ')}
            ref={ref}
            style={context.includeYAxisPadding ? {
                padding: context.gutterWidth / 2
            } : {
                paddingLeft: context.gutterWidth / 2,
                paddingRight: context.gutterWidth / 2
            }}
        >
            { props.children }
        </div>
    );
});

const Box = (props: React.PropsWithChildren<{}>) => {
    return (
        <div className="layout--box">
            { props.children }
        </div>
    )
}

export { Col, Row, Box };