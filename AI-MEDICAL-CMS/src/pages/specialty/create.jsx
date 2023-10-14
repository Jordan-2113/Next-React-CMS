import * as React from "react";
import { useNavigate } from "react-router";
import FieldHolder, { FieldHolderEl, FieldHolderTitle } from "../../components/field-holder";
import { EditorField, FileField, TextField, TextareaField } from "../../components/fields";
import Form from "../../components/form";
import { Box } from "../../components/layout";
import PageHead from "../../components/page-head";
import StyledButton from "../../components/styled-button";
import { TabView, TabViewBtn, TabViewBtnRow, TabViewEl } from "../../components/tab-view";
import { authFetch } from "../../contexts/auth";
import { objectToFormData } from "../../helper";

const CreateSpecialty = () => {
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/specialty/create`, {
            method: 'POST',
            body: objectToFormData(data)
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
            <PageHead>新增專業</PageHead>
            <Box>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder size="middle">
                            <FieldHolderEl>
                                <TextField
                                    title="URL Slug"
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
                                            {...register("en_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            {...register("en_description")}
                                            errorMsg={errors.en_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            {...register("en_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            {...register("en_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="tc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            {...register("tc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            {...register("tc_description")}
                                            errorMsg={errors.tc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            {...register("tc_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            {...register("tc_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="sc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            {...register("sc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="描述"
                                            {...register("sc_description")}
                                            errorMsg={errors.sc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="Meta Title"
                                            {...register("sc_metaname", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_metaname?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="Meta Description"
                                            {...register("sc_metadesc", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_metadesc?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                            </TabView>
                            <FieldHolderTitle>其他資料</FieldHolderTitle>
                            <FieldHolderEl>
                                <FileField
                                    title="圖片（220x220）"
                                    accept="image/*"
                                    {...register("picture")}
                                    errorMsg={errors.picture?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="Alt Text"
                                    {...register("alttext", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.alttext?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="優先"
                                    defaultValue="0"
                                    {...register("priority", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.priority?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <StyledButton themes={[ 'normal' ]}>
                                    <button disabled={sending}>新增</button>
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

export default CreateSpecialty;