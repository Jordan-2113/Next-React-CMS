import Promise from "bluebird";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import FieldHolder, { FieldHolderEl } from "../../../components/field-holder";
import { SelectField, TextField } from "../../../components/fields";
import Form from "../../../components/form";
import { Box } from "../../../components/layout";
import PageHead from "../../../components/page-head";
import StyledButton from "../../../components/styled-button";
import AuthContext, { authFetch } from "../../../contexts/auth";
import { objectToFormData } from "../../../helper";

const EditUser = ({ data }) => {
    const authContext = React.useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    if (authContext.payload?.role !== 1) {
        authContext.deniedRedirect();
    }

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/user/edit`, {
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
            <PageHead>修改使用者</PageHead>
            <Box>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder size="middle">
                            <FieldHolderEl>
                                <TextField
                                    title="使用者 ID"
                                    defaultValue={data.username}
                                    {...register("username", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.username?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="電郵地址"
                                    defaultValue={data.email}
                                    {...register("email", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.email?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <SelectField
                                    title="權限"
                                    defaultValue={data.role}
                                    errorMsg={errors.role?.message}
                                    {...register("role", { required: { message: "此欄位必須填寫", value: true } })}
                                >
                                    <option value="1">管理員</option>
                                    <option value="2">内容管理員</option>
                                </SelectField>
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

EditUser.initiator = ({ params }) => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/user/fetch/${params.id}`, { signal: controller.signal });
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

export default EditUser;