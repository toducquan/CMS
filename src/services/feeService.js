import { apiUtils } from 'utils/api.util';

export const getListFeeService = async (query) => {
    const res = await apiUtils.get('/fees', query);
    return res;
};

export const getFeeByIdService = async (id) => {
    const res = await apiUtils.get('/fees/' + id);
    return res;
};

export const addFeeService = async (data) => {
    const res = await apiUtils.post('/fees', data);
    return res;
};

export const updateFeeByIdService = async (id, data) => {
    const res = await apiUtils.patch('/fees/' + id, data);
    return res;
};
