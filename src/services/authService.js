import { apiUtils } from 'utils/api.util';

export const loginUserService = async (data) => {
    const res = await apiUtils.post('/auth/login', data);
    if (res) {
        localStorage.setItem('TOKEN', res.data.accessToken);
    }
    return res;
};

export const getProfileUserService = async () => {
    return await apiUtils.get('/auth');
};
