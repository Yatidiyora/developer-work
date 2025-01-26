import { getCookie } from 'typescript-cookie';
import getConfig from '../../../common/config/Config';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: any }) => {
    // authentication features
    const token = getCookie(getConfig().FRONTEND.DELELOPER_WORK_AUTH_TOKEN_ID)as string ;
    const { isExpired } = useJwt(token);
    const navigate = useNavigate();
    if (token && !isExpired) {
        return children;
    } else {
        navigate('/login');
        return;
    }
};

export default RequireAuth;
