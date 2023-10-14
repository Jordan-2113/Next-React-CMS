import * as React from "react";
import { useNavigate } from "react-router";
import FieldHolder, { FieldHolderEl } from "../../components/field-holder";
import { FileField, TextField } from "../../components/fields";
import Form from "../../components/form";
import { Box } from "../../components/layout";
import PageHead from "../../components/page-head";
import StyledButton from "../../components/styled-button";
import { authFetch } from "../../contexts/auth";
import { objectToFormData } from "../../helper";

const CreateService = () => {
    const navigate = useNavigate();
    const [ formMsg, setFormMsg ] = React.useState("");
    const [ sending, setSending ] = React.useState(false);

    const handleSubmit = async data => {
        setSending(true);
        const resp = await authFetch(`${process.env.REACT_APP_API_BASE}/banner/create`, {
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
            <PageHead>新增橫幅</PageHead>
            <Box>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder size="middle">
                            <FieldHolderEl>
                                <FileField
                                    title="圖片（1920x750）"
                                    accept="image/*"
                                    {...register("picture", { required: { value: true, message: "此欄位必須填寫" } })}
                                    errorMsg={errors.picture?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="連結"
                                    {...register("link")}
                                    errorMsg={errors.link?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="優先"
                                    defaultValue="20"
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

export default CreateService;