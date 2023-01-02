import { apiUtils } from 'utils/api.util';

export const getListBuildingService = async (query) => {
    const res = await apiUtils.get('/buildings', query);
    return res;
};

export const getBuildingByIdService = async (id) => {
    const res = await apiUtils.get('/buildings/' + id);
    return res;
};

export const updateBuildingByIdService = async (id, data) => {
    const res = await apiUtils.patch('/buildings/' + id, data);
    return res;
};

export const removeBuildingByIdService = async (id) => {
    const res = await apiUtils.delete('/buildings/' + id);
    return res;
};
