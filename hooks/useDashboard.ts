import { fetchStatusOrders } from '@/apiClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useDashboard({ countryId = 161, period = "This Week" }, p0: { staleTime: number; refetchOnWindowFocus: boolean; }) {

  console.log('hooks period:', period);

  const {
    isLoading,
    data: dashboard,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD, countryId, period],
    queryFn: () => fetchStatusOrders({ countryId, period }),
    enabled: !!countryId && !!period, // <--- only run when ready
    retry: true,
  });

  console.log('dashboard:', dashboard);
  return { isLoading, error, dashboard, isError, refetch };
}
