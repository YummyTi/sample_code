import {useQuery} from 'react-query';

import {IOnlineUsersModel} from '@models/online_users_model';

import {getOnlineUsers} from './index';

const useOnlineUsers = () => {
    const {isLoading, data} = useQuery(['onlineUsers'], getOnlineUsers, {
        retry: 1,
        refetchInterval: 25000,
        refetchOnWindowFocus: true,
    });

    const onlineUsers: IOnlineUsersModel[] = data?.data.data.users;

    return {
        isLoading,
        data: onlineUsers,
    };
};

export default useOnlineUsers;
