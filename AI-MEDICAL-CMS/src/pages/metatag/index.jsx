import * as React from "react";
import { authFetch } from "../../contexts/auth";
import Promise from "bluebird";
import { serializeToQueryString } from "../../helper";
import PageHead from "../../components/page-head";


import { format } from "date-fns";

import PureTable from "../../components/pure-table";
import StyledButton from "../../components/styled-button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ValueBuilder from "../../components/value-builder";
import { VariableScopeProvider } from "../../components/variable-scope";
import { Box } from "../../components/layout";

export const navigator = {
    id: "metatag",
    title: "Meta Tag",
    icon: "tag",
    order: 1
}

const SpecialtyIndex = () => {
    const fetchRequest = React.useCallback(query => new Promise(async (resolve, reject, onCancel) => {
        const controller = new AbortController();
        onCancel(() => controller.abort());
        try {
            const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/metatag/fetch?${serializeToQueryString(query)}`, { signal: controller.signal });
            if (!resp.ok) {
                return reject(new Error(resp.status));
            }
            resolve(await resp.json());
        } catch (e) {
            reject(e);
        }
    }), []);
    let metaid = ["	首頁","關於我們","消息中心","醫生團隊","手機程式","聯絡我們"];
    console.log(metaid[1]);

    return (
        <>
            <PageHead>Meta Tag</PageHead>
            <VariableScopeProvider extendQuery>
                <ValueBuilder promise={fetchRequest}>
                    { ({ data }) => (
                        <Box>
                            <PureTable
                                columns={[
                                    { Header: 'Page Id', accessor: 'value', Cell: ({value}) =>{ return metaid[value-1] } },
                                    { Header: 'Meta Title', accessor: 'tc_title' },
                                    { Header: 'Meta Desc', accessor: 'tc_description' },
                                    { Header: '最後修改日期', accessor: 'updatedAt' },
                                    { Header: '動作', accessor: 'id', Cell: ({ value: id }) => {
                                        if (id == null) {
                                            return (<></>);
                                        }
                                        return (
                                            <div className="button-row">
                                                <div className="button-row--item">
                                                    <StyledButton themes={[ 'light' ]}>
                                                        <Link to={`edit/${id}`}>
                                                            <FontAwesomeIcon icon={[ 'fas', 'edit' ]} size="lg" />
                                                            <div className="a11y">修改</div>
                                                        </Link>
                                                    </StyledButton>
                                                </div>
                                            </div>
                                        )
                                    } }
                                ]}
                                data={data.map(d => ({
                                    ...d,
                                    updatedAt: format(new Date(d.updatedAt), 'yyyy-MM-dd HH:mm'),
                                    value: d.id
                                }))}
                            />
                        </Box>
                    ) }
                </ValueBuilder>
            </VariableScopeProvider>
        </>
    )
}

export default SpecialtyIndex;