import { fetchCurrentUsers } from '@/apiClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';


const {isLoading, data} = useQuery({
    queryKey: [QUERY_KEYS.USER, 'user'],
    queryFn: () => fetchCurrentUsers(), 
    onSuccess: (user) => {
        setQueryData(['user'], user.user);
        console.log('User data fetched successfully:', data);  
    }
    retry: false,
})