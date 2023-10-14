import Promise from "bluebird";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import FieldHolder, { FieldHolderEl } from "../../../components/field-holder";
import { TextField, TextareaField } from "../../../components/fields";
import Form from "../../../components/form";
import { Box } from "../../../components/layout";
import PageHead from "../../../components/page-head";
import StyledButton from "../../../components/styled-button";
import { TabView, TabViewBtn, TabViewBtnRow, TabViewEl } from "../../../components/tab-view";
import { authFetch } from "../../../contexts/auth";
import { objectToFormData } from "../../../helper";

const EditMetatag = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/metatag/edit`, {
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
            <PageHead>Meta Tag</PageHead>
            <Box>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder size="middle">
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
                                            defaultValue={data.en_title}
                                            {...register("en_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.en_title?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="tc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            defaultValue={data.tc_title}
                                            {...register("tc_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.tc_title?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="sc">
                                    <FieldHolderEl>
                                        <TextField
                                            title="標題"
                                            defaultValue={data.sc_title}
                                            {...register("sc_title", { required: { value: true, message: "此欄位必須填寫" } })}
                                            errorMsg={errors.sc_title?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="en">
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="描述"
                                            defaultValue={data.en_description}
                                            {...register("en_description")}
                                            errorMsg={errors.en_description?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="tc">
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="描述"
                                            defaultValue={data.tc_description}
                                            {...register("tc_description")}
                                            errorMsg={errors.tc_description?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                                <TabViewEl id="sc">
                                    <FieldHolderEl>
                                        <TextareaField
                                            title="描述"
                                            defaultValue={data.sc_description}
                                            {...register("sc_description")}
                                            errorMsg={errors.sc_description?.message}
                                        />
                                    </FieldHolderEl>
                                </TabViewEl>
                            </TabView>
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

EditMetatag.initiator = ({ params }) => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/metatag/fetch/${params.id}`, { signal: controller.signal });
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

export default EditMetatag;