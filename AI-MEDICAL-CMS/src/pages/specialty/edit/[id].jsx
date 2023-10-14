import Promise from "bluebird";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import FieldHolder, { FieldHolderEl, FieldHolderTitle } from "../../../components/field-holder";
import { EditorField, FileField, TextField, TextareaField } from "../../../components/fields";
import Form from "../../../components/form";
import { Box } from "../../../components/layout";
import PageHead from "../../../components/page-head";
import StyledButton from "../../../components/styled-button";
import { TabView, TabViewBtn, TabViewBtnRow, TabViewEl } from "../../../components/tab-view";
import { authFetch } from "../../../contexts/auth";
import { objectToFormData } from "../../../helper";

const EditSpecialty = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/specialty/edit`, {
            method: 'POST',
            body: objectToFormData({ ...data, id })
        }).catch(() => {
            setFormMsg("暫時無法發送請求，請稍後再嘗試");
        }).finally(() => {
            setSending(false);
        });
        if (resp == null) return;
        if (!resp.ok) {
            setFormMsg("暫時無法發送請求，請稍後再嘗試");
            return;
        }
        navigate(-1);
    }

    return (
        <>
            <PageHead>修改專業</PageHead>
            <Box>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder size="middle">
                            <FieldHolderEl>
                                <TextField
                                    title="URL Slug"
                                    defaultValue={data.slug}
                                    {...register("slug", { required: { value: true, message: "此字段為必填字段，只能包含字母、數字和“-”。" } })}
                                    errorMsg={errors.slug?.message}
                                />
                            </FieldHolderEl>
                            <TabView initialView="en" labels={[ { id: "en", name: "英文" }, { id: "tc", name: "繁體中文" }, { id: "sc", name: "簡體中文" } ]}>
                                <FieldHolderEl>
                                    <TabViewBtnRow inline>
                                        <TabViewBtn for="en" />
                                        <TabViewBtn for="tc" />
                                        <TabViewBtn for="sc" />
                                    </TabViewBtnRow>
                                </FieldHolderEl>
                                <TabViewEl id="en">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            defaultValue={data.en_name}
                                            {...register("en_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            defaultValue={data.en_description}
                                            {...register("en_description")}
                                            errorMsg={errors.en_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            defaultValue={data.en_metaname}
                                            {...register("en_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            defaultValue={data.en_metadesc}
                                            {...register("en_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="tc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            defaultValue={data.tc_name}
                                            {...register("tc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            defaultValue={data.tc_description}
                                            {...register("tc_description")}
                                            errorMsg={errors.tc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            defaultValue={data.tc_metaname}
                                            {...register("tc_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            defaultValue={data.tc_metadesc}
                                            {...register("tc_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="sc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            defaultValue={data.sc_name}
                                            {...register("sc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            defaultValue={data.sc_description}
                                            {...register("sc_description")}
                                            errorMsg={errors.sc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            defaultValue={data.sc_metaname}
                                            {...register("sc_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            defaultValue={data.sc_metadesc}
                                            {...register("sc_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                            </TabView>
                            <FieldHolderTitle>其他資料</FieldHolderTitle>
                            <FieldHolderEl>
                                <FileField
                                    title="圖片（230x230）"
                                    accept="image/*"
                                    {...register("picture")}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="Alt Text"
                                    defaultValue={data.alttext}
                                    {...register("alttext", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.alttext?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="優先"
                                    defaultValue={data.priority}
                                    {...register("priority", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.priority?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <StyledButton themes={[ 'normal' ]}>
                                    <button disabled={sending}>修改</button>
                                </StyledButton>
                            </FieldHolderEl>
                            { formMsg?.length > 0 && <FieldHolderEl>
                                <div className="error">{ formMsg }</div>
                            </FieldHolderEl> }
                        </FieldHolder>
                    ) }
                </Form>
            </Box>
        </>
    )
}

EditSpecialty.initiator = ({ params }) => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/specialty/fetch/${params.id}`, { signal: controller.signal });
        if (!resp.ok) {
            return reject(new Error(resp.status));
        }
        resolve({
            props: {
                data: (await resp.json()).data
            }
        });
    } catch (e) {
        reject(e);
    }
});

export default EditSpecialty;