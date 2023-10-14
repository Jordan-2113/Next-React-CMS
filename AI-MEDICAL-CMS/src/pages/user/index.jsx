import * as React from "react";
import AuthContext, { authFetch } from "../../contexts/auth";
import Promise from "bluebird";
import { serializeToQueryString } from "../../helper";
import PageHead from "../../components/page-head";
import { format } from "date-fns";
import { toast } from "react-toastify";
import PureTable from "../../components/pure-table";
import StyledButton from "../../components/styled-button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VariableScopeProvider } from "../../components/variable-scope";
import ValueBuilder from "../../components/value-builder";
import { Box } from "../../components/layout";

export const navigator = {
    id: "user",
    title: "使用者",
    icon: "users",
    order: 5,
    shouldShowInNavigator: payload => payload?.role === 1
}

const UserIndex = () => {
    const authContext = React.useContext(AuthContext);

    if (authContext.payload?.role !== 1) {
        authContext.deniedRedirect();
    }

    const fetchRequest = React.useCallback(query => new Promise(async (resolve, reject, onCancel) => {
        const controller = new AbortController();
        onCancel(() => controller.abort());
        try {
            const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/user/fetch?${serializeToQueryString(query)}`, { signal: controller.signal });
            if (!resp.ok) {
                return reject(new Error(resp.status));
            }
            resolve(await resp.json());
        } catch (e) {
            reject(e);
        }
    }), []);

    const handleDelete = async (e, id, reload) => {
        e.preventDefault();
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/user/delete?${serializeToQueryString({ id })}`, {
            method: 'DELETE',
        }).catch(() => {
            toast("暫時無法發送請求，請稍後再嘗試");
        }).finally(() => {
            //
        });
        if (resp == null) return;
        if (!resp.ok) {
            toast("暫時無法發送請求，請稍後再嘗試");
            return;
        }
        reload();
    }
    
    return (
        <>
            <PageHead actions={[ { label: "新增使用者", href: "./create" } ]}>使用者</PageHead>
            <VariableScopeProvider extendQuery>
                { ({ reload }) => (
                    <>
                        <ValueBuilder promise={fetchRequest}>
                            { ({ data }) => (
                                <Box>
                                    <PureTable
                                        columns={[
                                            { Header: '使用者 ID', accessor: 'username' },
                                            { Header: '電郵地址', accessor: 'email' },
                                            { Header: '權限', accessor: 'role' },
                                            { Header: '最後修改日期', accessor: 'updatedAt' },
                                            { Header: '動作', accessor: 'id', Cell: ({ value: id }) => {
                                                if (id == null || id === authContext.payload?.id) {
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
                                                        <div className="button-row--item">
                                                            <StyledButton themes={[ 'light' ]}>
                                                                <button onClick={e => handleDelete(e, id, reload)}>
                                                                    <FontAwesomeIcon icon={[ 'fas', 'trash' ]} size="lg" />
                                                                    <div className="a11y">刪除</div>
                                                                </button>
                                                            </StyledButton>
                                                        </div>
                                                    </div>
                                                )
                                            } }
                                        ]}
                                        data={data.map(d => ({ ...d, role: d.role === 1 ? '管理員' : '内容管理員', updatedAt: format(new Date(d.updatedAt), 'yyyy-MM-dd HH:mm') }))}
                                    />
                                </Box>
                            ) }
                        </ValueBuilder>
                    </>
                ) }
            </VariableScopeProvider>
        </>
    )
}

export default UserIndex;