import {useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {ROLENAME} from '@shared/helpers/constants';
import {useAuthStore} from '@store/auth';
import {useRoleStore} from '@store/role';

import {getRoles} from './index';

const useRoles = () => {
    const location = useLocation();
    const userInfo = useAuthStore((state) => state.userInfo);

    const {setRoles, page, refetch} = useRoleStore(
        (state) => ({...state}),
        shallow,
    );
    let params: string;

    if (location.pathname === '/manage/main') {
        params = '';
    } else {
        params = `page=${page}&size=10`;
    }

    return useQuery(['roles', page, refetch], () => getRoles({params}), {
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: userInfo.roleName === ROLENAME.roleName,
        onSuccess: (data) => {
            const dataList = data;
            if (dataList?.list) {
                setRoles(data.list);
            } else {
                setRoles(dataList);
            }
        },
        onError: (err) => {
            console.log(err, 'err');
        },
    });
};

export default useRoles;
