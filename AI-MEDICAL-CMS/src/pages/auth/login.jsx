import * as React from "react";
import { useNavigate } from "react-router";
import FieldHolder, { FieldHolderEl } from "../../components/field-holder";
import { TextField } from "../../components/fields";
import Form from "../../components/form";
import StyledButton from "../../components/styled-button";
import AuthContext from "../../contexts/auth";
import { serializeToQueryString } from "../../helper";
import jwt_decode from "jwt-decode";

export const shouldShowPanel = false;
export const requiredLogin = false;

const Login = () => {
    const navigate = useNavigate();
    const auth = React.useContext(AuthContext);
    const [ sending, setSending ] = React.useState(false);
    const [ formMsg, setFormMsg ] = React.useState("");

    const handleSubmit = async data => {
        setSending(true);
        const resp = await fetch(`${process.env.REACT_APP_API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: serializeToQueryString(data)
        }).catch(() => {
            setFormMsg("暫時無法發送請求，請稍後再嘗試");
        }).finally(() => {
            setSending(false);
        });
        if (resp == null) return;
        if (!resp.ok) {
            setFormMsg("輸入的使用者 ID 或密碼錯誤");
            return;
        }
        const json = await resp.json();
        auth.login(json.token, "JWT", jwt_decode(json.token, { header: false }));
    }

    React.useEffect(() => {
        document.body.style.backgroundColor = "#fff";
        return () => {
            document.body.style.backgroundColor = "";
        }
    }, []);

    React.useEffect(() => {
        if (auth.isLogined) {
            auth.loginedRedirect();
        }
    }, [ navigate, auth, auth.isLogined ]);

    return (
        <div style={{ maxWidth: 450, width: '100%', margin: 'auto', display: 'table', height: '100vh', paddingLeft: 18, paddingRight: 18 }}>
            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img src={process.env.REACT_APP_LOGO_PATH ?? "/images/--default-logo.jpg"} alt="" style={{ width: '100%', maxWidth: 250 }} /> 
                </div>
                <Form onSubmit={handleSubmit}>
                    { ({ register, state: { errors } }) => (
                        <FieldHolder>
                            <FieldHolderEl>
                                <TextField
                                    title="使用者 ID"
                                    {...register("username", { required: { value: true, message: "請輸入使用者 ID" } })}
                                    errorMsg={errors.username?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextField
                                    title="密碼"
                                    type="password"
                                    {...register("password", { required: { value: true, message: "請輸入密碼" } })}
                                    errorMsg={errors.password?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <StyledButton themes={[ 'normal' ]}>
                                    <button style={{ width: '100%' }} disabled={sending}>登入</button>
                                </StyledButton>
                            </FieldHolderEl>
                            { formMsg?.length > 0 && <FieldHolderEl>
                                <div className="error">{ formMsg }</div>
                            </FieldHolderEl> }
                        </FieldHolder>
                    ) }
                </Form>
            </div>
        </div>
    )
}

export default Login;