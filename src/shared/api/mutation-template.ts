import {AxiosResponse} from 'axios';
import {useMutation, useQueryClient} from 'react-query';

export const useMutationTemplate = <T>(
    mutationQuery: (data: T) => Promise<AxiosResponse>,
    queryKey: string,
    ...args: (() => void)[]
) => {
    const queryClient = useQueryClient();

    return useMutation((data: T) => mutationQuery(data), {
        onSuccess: () => {
            if (queryKey?.length) {
                queryClient.invalidateQueries(queryKey);
            }
            args.forEach((arg) => arg());
        },
        onError: (error) => {
            console.error(error, 'mutation error');
        },
    });
};
