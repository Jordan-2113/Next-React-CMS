import * as React from "react";
import { useNavigate } from "react-router";
import FieldHolder, { FieldHolderEl, FieldHolderTitle } from "../../components/field-holder";
import { EditorField, FileField, MultipleField, SelectField, TextField, TextareaField } from "../../components/fields";
import Form from "../../components/form";
import PageHead from "../../components/page-head";
import StyledButton from "../../components/styled-button";
import { TabView, TabViewBtn, TabViewBtnRow, TabViewEl } from "../../components/tab-view";
import { authFetch } from "../../contexts/auth";
import { objectToFormData } from "../../helper";
import Promise from "bluebird";
import { Box } from "../../components/layout";

const CreateDoctor = ({ specialties }) => {
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/doctor/create`, {
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
            <PageHead>新增醫生</PageHead>
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
                                            title="姓名"
                                            {...register("en_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="職位"
                                            {...register("en_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_title?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="簡介"
                                            {...register("en_description", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="語言或方言"
                                            {...register("en_dialect", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_dialect?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="應診地點"
                                            {...register("en_clinic", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_clinic?.message}
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
                                            title="姓名"
                                            {...register("tc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="職位"
                                            {...register("tc_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_title?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="簡介"
                                            {...register("tc_description", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="語言或方言"
                                            {...register("tc_dialect", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_dialect?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="應診地點"
                                            {...register("tc_clinic", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_clinic?.message}
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
                                            title="姓名"
                                            {...register("sc_name", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_name?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="職位"
                                            {...register("sc_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_title?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <EditorField
                                            title="簡介"
                                            {...register("sc_description", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_description?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="語言或方言"
                                            {...register("sc_dialect", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_dialect?.message}
                                        />
                                    </FieldHolderEl>
                                    <FieldHolderEl>
                                        <TextField
                                            title="應診地點"
                                            {...register("sc_clinic", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_clinic?.message}
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
                                <MultipleField title="專業" values={[]}>
                                    { ({ value, id }) => {
                                        return (
                                            <SelectField
                                                key={id}
                                                defaultValue={value.id}
                                                errorMsg={errors.specialty != null && errors.specialty[id]?.message}
                                                {...register(`specialty.${id}`, {
                                                    shouldUnregister: true,
                                                    required: {
                                                        message: "此欄位必須填寫",
                                                        value: true
                                                    }
                                                })}
                                            >
                                                { specialties.map(specialty => {
                                                    return <option key={specialty.id} value={specialty.id}>{specialty.tc_name}</option>;
                                                }) }
                                            </SelectField>
                                        )
                                    } }
                                </MultipleField>
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <MultipleField title="學歷" values={[]}>
                                    { ({ value, id }) => {
                                        return (
                                            <FieldHolder>
                                                <FieldHolderEl col="4">
                                                    <TextField
                                                        placeholder="繁中"
                                                        errorMsg={errors.tcAttainment != null && errors.tcAttainment[id]?.message}
                                                        {...register(`tcAttainment.${id}`, {
                                                            shouldUnregister: true,
                                                            required: {
                                                                message: "此欄位必須填寫",
                                                                value: true
                                                            }
                                                        })}
                                                    />
                                                </FieldHolderEl>
                                                <FieldHolderEl col="4">
                                                    <TextField
                                                        placeholder="簡中"
                                                        errorMsg={errors.scAttainment != null && errors.scAttainment[id]?.message}
                                                        {...register(`scAttainment.${id}`, {
                                                            shouldUnregister: true,
                                                            required: {
                                                                message: "此欄位必須填寫",
                                                                value: true
                                                            }
                                                        })}
                                                    />
                                                </FieldHolderEl>
                                                <FieldHolderEl col="4">
                                                    <TextField
                                                        placeholder="英文"
                                                        errorMsg={errors.enAttainment != null && errors.enAttainment[id]?.message}
                                                        {...register(`enAttainment.${id}`, {
                                                            shouldUnregister: true,
                                                            required: {
                                                                message: "此欄位必須填寫",
                                                                value: true
                                                            }
                                                        })}
                                                    />
                                                </FieldHolderEl>
                                            </FieldHolder>
                                        )
                                    } }
                                </MultipleField>
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <FileField
                                    title="圖片（450x450）"
                                    accept="image/*"
                                    {...register("picture", { required: { value: true, message: "此欄位必須填寫" } })}
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
                                    defaultValue="50"
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

CreateDoctor.initiator = () => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/specialty/fetch`, { signal: controller.signal });
        if (!resp.ok) {
            return reject(new Error(resp.status));
        }
        resolve({
            props: {
                specialties: (await resp.json()).data
            }
        });
    } catch (e) {
        reject(e);
    }
});

export default CreateDoctor;