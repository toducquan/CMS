import { apiUtils } from 'utils/api.util';

export const getListRentService = async (query) => {
    const res = await apiUtils.get('/rents', query);
    return res;
};

export const getRentByIdService = async (id) => {
    const res = await apiUtils.get('/rents/' + id);
    return res;
};

export const addRentService = async (data) => {
    const res = await apiUtils.post('/rents', data);
    return res;
};

export const updateRentByIdService = async (id, data) => {
    const res = await apiUtils.patch('/rents/' + id, data);
    return res;
};
