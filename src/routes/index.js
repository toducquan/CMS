import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { getProfileUserService } from 'services/authService';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const navigate = useNavigate();
    const token = localStorage.getItem('TOKEN');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            getProfileUserService()
                .then((res) => {})
                .catch((err) => {
                    localStorage.removeItem('TOKEN');
                    navigate('/login');
                });
        }
    }, []);

    return useRoutes([MainRoutes, LoginRoutes]);
}
