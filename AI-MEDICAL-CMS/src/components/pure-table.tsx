import * as React from "react";
import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { Column, useTable } from "react-table";

export type PureTableProps = {
    columns: Array<Column<object>>;
    data: object[];
}

const PureTable = ({ columns, data }: PureTableProps): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="pure-table">
            <div className="pure-table--wrapper">
                <table { ...getTableProps() }>
                    <thead>
                        { headerGroups.map((headerGroup, idx) => (
                            <tr key={idx}>
                                { headerGroup.headers.map(column => (
                                    <th { ...column.getHeaderProps() } style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                                            { column.render('Header') }
                                    </th>
                                )) }
                            </tr>
                        )) }
                    </thead>
                    <tbody { ...getTableBodyProps() }>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    { row.cells.map(cell => (
                                        <td { ...cell.getCellProps() }>
                                            { cell.render('Cell') }
                                        </td>
                                    )) }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export type PureTablePlaceholderProps = {
    columns: Array<Column<object>>;
    dataLength?: number;
}

const columnMapToData = (columns: Array<Column<object>>, dataLength: number): object[] => {
    const keys = columns.filter(x => x.accessor != null && typeof x.accessor === 'string').map<string>(x => x.accessor as string);
    const obj: { [key: string]: any } = {};
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = '';
    }
    return Array(dataLength).fill(obj);
}


export const PureTablePlaceholder = ({ columns: sourceColumns, dataLength = 10 }: PureTablePlaceholderProps): JSX.Element => {
    const columns = React.useMemo(() => {
        return sourceColumns.map(x => ({
            ...x,
            Cell: () => <div style={{padding: '2px 0'}}>
                <Skeleton width={`${(Math.random()*80)+10}%`} />
            </div>
        }))
    }, [ sourceColumns ]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: columnMapToData(columns, dataLength)
    });

    return (
        <div className="pure-table">
            <div className="pure-table--wrapper">
                <table { ...getTableProps() }>
                    <thead>
                        { headerGroups.map((headerGroup, idx) => (
                            <tr key={idx}>
                                { headerGroup.headers.map(column => (
                                    <th
                                        { ...column.getHeaderProps() }
                                        style={{
                                            width: column.width,
                                            minWidth: column.minWidth,
                                            maxWidth: column.maxWidth
                                        }}
                                    >
                                            { column.render('Header') }
                                    </th>
                                )) }
                            </tr>
                        )) }
                    </thead>
                    <tbody { ...getTableBodyProps() }>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    { row.cells.map(cell => (
                                        <td { ...cell.getCellProps() }>
                                            { cell.render('Cell') }
                                        </td>
                                    )) }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const PureTableEmpty = (): JSX.Element => {
    const intl = useIntl();

    return (
        <div className="pure-table">
            <div className="pure-table--wrapper">
                <div className="pure-table--empty">
                    { intl.formatMessage({ id: "pure-table.no-content", defaultMessage: "There is no content to display" }) }
                </div>
            </div>
        </div>
    );
}

export default PureTable;