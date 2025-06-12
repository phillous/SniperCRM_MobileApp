import { fetchCountries } from "@/apiClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useFetchCountries() {
  const {
    isLoading,
    data: countries,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: () => fetchCountries(),
    retry: false,
  });

  return { isLoading, error, countries };
}


