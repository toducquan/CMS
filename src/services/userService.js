import { apiUtils } from 'utils/api.util';

export const getListUserService = async (query) => {
    const res = await apiUtils.get('/users', query);
    return res;
};

export const getUserByIdService = async (id) => {
    const res = await apiUtils.get('/users/' + id);
    return res;
};

export const updateUserByIdService = async (id, data) => {
    const res = await apiUtils.patch('/users/' + id, data);
    return res;
};

export const removeUserByIdService = async (id) => {
    const res = await apiUtils.delete('/users/' + id);
    return res;
};
