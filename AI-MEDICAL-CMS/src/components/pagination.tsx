import * as React from "react";
import { useIntl } from "react-intl";
import VariableScope from "./variable-scope";

export type PaginationProps = {
    maxPage: number;
    pageCount: number;
    pageKey: string;
    label(i: number): string;
    getLinkParams(i: number): { [key: string]: string };
    showFirst: boolean;
    showLast: boolean;
}

const Pagination = (props: PaginationProps): JSX.Element => {
    const { values: params, pushOrReplaceValues } = React.useContext(VariableScope);
    const intl = useIntl();
    const currentPage = parseInt(params[`${props.pageKey || "p"}`] as string) || 1;
    const pages = [];

    if (currentPage !== 1) {
        pages.push(currentPage - 1);
    }

    for (let i = currentPage; i <= props.pageCount; i++) {
        pages.push(i);
        if (pages.length === props.maxPage) {
            break;
        }
    }

    if (pages.length !== props.maxPage && pages.length > 0) {
        for (let i = pages[0] - 1; i >= 1; i--) {
            pages.unshift(i);
            if (pages.length === props.maxPage) {
                break;
            }
        }
    }

    // disable pagination when don't need
    if (pages.length <= 1) {
        return <></>;
    }

    const handleClick = (e: React.MouseEvent, idx: number, data: { [key: string]: string }): void => {
        e.preventDefault();
        const _d = { ...data };
        _d[`${props.pageKey || "p"}`] = `${idx}`;
        pushOrReplaceValues(_d);
    }

    return (
        <div className="pagination">
            <div className="pagination--wrapper">
                { currentPage > 1 && <button
                    type="button"
                    className="pagination--page pagination--arrow"
                    onClick={e => handleClick(e, currentPage-1, props.getLinkParams(currentPage-1))}
                >
                    <svg viewBox="0 0 23 23">
                        <title>{ intl.formatMessage({ id: "pagination.prev", defaultMessage: "Prev Page" }) }</title>
                        <path strokeWidth="2" strokeLinecap="round" d="M 14 4 L 7 10" />
                        <path strokeWidth="2" strokeLinecap="round" d="M 7 10 L 14 16" />
                    </svg>
                </button> }
                { props.showFirst && pages[0]-2 >= 1 && <>
                    <button
                        type="button"
                        className="pagination--page"
                        onClick={e => handleClick(e, 1, props.getLinkParams(1))}
                    >
                        { props.label(1) }
                    </button>
                    <span>...</span>
                </> }
                { pages.map((page, idx) => {
                    return (
                        <button
                            key={idx}
                            type="button"
                            className={`pagination--page${currentPage === page ? " active" : ""}`}
                            onClick={currentPage === page ? undefined : e => handleClick(e, page, props.getLinkParams(page))}
                        >
                            { props.label(page) }
                        </button>
                    )
                }) }
                { props.showLast && pages[pages.length-1]+2 <= props.pageCount && <>
                    <span>...</span>
                    <button
                        type="button"
                        className="pagination--page"
                        onClick={e => handleClick(e, props.pageCount, props.getLinkParams(props.pageCount))}
                    >
                        { props.label(props.pageCount) }
                    </button>
                </> }
                { currentPage !== props.pageCount && <button
                    type="button"
                    className="pagination--page pagination--arrow"
                    onClick={e => handleClick(e, currentPage+1, props.getLinkParams(currentPage+1))}
                >
                    <svg viewBox="0 0 23 23">
                        <title>{ intl.formatMessage({ id: "pagination.next", defaultMessage: "Next Page" }) }</title>
                        <path strokeWidth="2" strokeLinecap="round" d="M 9 4 L 16 10" />
                        <path strokeWidth="2" strokeLinecap="round" d="M 16 10 L 9 16" />
                    </svg>
                </button> }
            </div>
        </div>
    )
}

export default Pagination;