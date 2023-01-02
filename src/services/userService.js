import { apiUtils } from 'utils/api.util';

export const getListUserService = async (query) => {
    const res = await apiUtils.get('/users', query);
    return res;
};
