import * as React from "react";
import { authFetch } from "../../contexts/auth";
import Promise from "bluebird";
import { serializeToQueryString, stripHTML } from "../../helper";
import ContentRow, { ContentRowPlaceholder } from "../../components/content-row";
import PageHead from "../../components/page-head";
import Controls, { ControlEl } from "../../components/controls";
import SortOption from "../../components/sort-option";
import { toast } from "react-toastify";
import { VariableScopeProvider } from "../../components/variable-scope";
import ValueBuilder from "../../components/value-builder";

export const navigator = {
    id: "service",
    title: "消息中心",
    icon: "bed",
    order: 2
}

const ServiceIndex = () => {
    const fetchRequest = React.useCallback(query => new Promise(async (resolve, reject, onCancel) => {
        const controller = new AbortController();
        onCancel(() => controller.abort());
        try {
            const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/service/fetch?${serializeToQueryString(query)}`, { signal: controller.signal });
            if (!resp.ok) {
                return reject(new Error(resp.status));
            }
            resolve(await resp.json());
        } catch (e) {
            reject(e);
        }
    }), []);

    const renderPlaceholder = () => {
        return new Array(5).fill("").map((el, idx) => {
            return (
                <ContentRowPlaceholder key={idx} picture attr description />
            )
        })
    }

    const handleDelete = async (e, id, reload) => {
        e.preventDefault();
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/service/delete?${serializeToQueryString({ id })}`, {
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
            <PageHead actions={[ { label: "新增消息", href: "./create" } ]}>消息中心</PageHead>
            <VariableScopeProvider extendQuery>
                { ({ reload }) => (
                    <>
                        <Controls>
                            <ControlEl>
                                <SortOption options={[{ id: "1", label: "優先" }, { id: "2", label: "修改日期" }]} />
                            </ControlEl>
                        </Controls>
                        <ValueBuilder promise={fetchRequest} placeholder={renderPlaceholder()}>
                            { ({ data }) => (
                                <>
                                    { data.map((el, idx) => <ContentRow
                                        key={idx}
                                        title={el.tc_title}
                                        description={stripHTML(el.tc_content)}
                                        picture={el.picture}
                                        actions={[
                                            { label: "修改", href: `./edit/${el.id}` },
                                            { label: "刪除", href: "/#", onClick: e => handleDelete(e, el.id, reload) },
                                        ]}
                                    />) }
                                </>
                            ) }
                        </ValueBuilder>
                    </>
                ) }
            </VariableScopeProvider>
        </>
    )
}

export default ServiceIndex;