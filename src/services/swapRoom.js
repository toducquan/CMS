import { apiUtils } from 'utils/api.util';

export const getAllSwapRequest = async (query) => {
    const res = await apiUtils.get('/room-swap', query);
    return res;
};

export const approveSwapRequest = async (data) => {
    const res = await apiUtils.post('/room-swap/approve-swap-request', data);
    return res;
};

export const rejectSwapRequest = async (id) => {
    const res = await apiUtils.delete('/room-swap/' + id);
    return res;
};
