import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext, { AuthContextType } from '../contexts/auth';

export type AuthRouteProps = {
    requiredLogin: boolean,
    redirectLogin: boolean
}

const AuthRoute = ({ requiredLogin, redirectLogin, children }: React.PropsWithChildren<AuthRouteProps>): JSX.Element => {
    const auth = React.useContext<AuthContextType>(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const currentPath = location == null ? "" : location.pathname + location.search + location.hash;
        if (requiredLogin && !auth.isLogined) {
            navigate(redirectLogin ? `${auth.loginPath}?r=${currentPath}` : auth.loginPath);
        }
    }, [ auth.isLogined, auth.loginPath, location, requiredLogin, redirectLogin, navigate ]);


    return (
        <>
            { children }
        </>
    )
}

export default AuthRoute;