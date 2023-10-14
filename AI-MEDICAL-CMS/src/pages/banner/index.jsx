import * as React from "react";
import { authFetch } from "../../contexts/auth";
import Promise from "bluebird";
import { serializeToQueryString } from "../../helper";
import PageHead from "../../components/page-head";
import Controls, { ControlEl } from "../../components/controls";
import SortOption from "../../components/sort-option";
import { toast } from "react-toastify";
import { VariableScopeProvider } from "../../components/variable-scope";
import ValueBuilder from "../../components/value-builder";
import PureTable from "../../components/pure-table";
import StyledButton from "../../components/styled-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Box } from "../../components/layout";

export const navigator = {
    id: "banner",
    title: "橫幅",
    icon: "image",
    order: 0
}

const BannerIndex = () => {
    const fetchRequest = React.useCallback(query => new Promise(async (resolve, reject, onCancel) => {
        const controller = new AbortController();
        onCancel(() => controller.abort());
        try {
            const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/banner/fetch?${serializeToQueryString(query)}`, { signal: controller.signal });
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
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/banner/delete?${serializeToQueryString({ id })}`, {
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
            <PageHead actions={[ { label: "新增橫幅", href: "./create" } ]}>橫幅</PageHead>
            <VariableScopeProvider extendQuery>
                { ({ reload }) => (
                    <>
                        <Controls>
                            <ControlEl>
                                <SortOption options={[{ id: "1", label: "優先" }, { id: "2", label: "修改日期" }]} />
                            </ControlEl>
                        </Controls>
                        <ValueBuilder promise={fetchRequest}>
                            { ({ data }) => (
                                <Box>
                                    <PureTable
                                        columns={[
                                            { Header: '圖片', accessor: 'banner_path', Cell: ({ value }) => <img src={value} alt="" /> },
                                            { Header: '優先', accessor: 'priority' },
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
                                        data={data.map(d => ({ ...d, updatedAt: format(new Date(d.updatedAt), 'yyyy-MM-dd HH:mm') }))}
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

export default BannerIndex;