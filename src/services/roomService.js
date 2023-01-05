import { apiUtils } from 'utils/api.util';

export const getListRoomService = async (query) => {
    const res = await apiUtils.get('/rooms', query);
    return res;
};

export const getRoomByIdService = async (id) => {
    const res = await apiUtils.get('/rooms/' + id);
    return res;
};

export const addRoomService = async (data) => {
    const res = await apiUtils.post('/rooms', data);
    return res;
};

export const updateRoomByIdService = async (id, data) => {
    const res = await apiUtils.patch('/rooms/' + id, data);
    return res;
};

export const removeStudentsInRoomService = async (data) => {
    const res = await apiUtils.patch('/rooms/students-in-room', data);
    return res;
};
