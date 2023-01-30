import { apiUtils } from 'utils/api.util';

export const getAllAspiration = async (query) => {
    const res = await apiUtils.get('/aspiration', query);
    return res;
};

export const approveAspiration = async (data) => {
    const res = await apiUtils.post('/aspiration/approve-multiple-aspiration', data);
    return res;
};

export const rejectAspirationService = async (id) => {
    const res = await apiUtils.delete('/aspiration/' + id);
    return res;
};
