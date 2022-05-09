import apiReq from '../interceptor';

export const getOnlineUsers = async () => {
    const response = await apiReq.get('auth/onlineusers');
    return response;
};
