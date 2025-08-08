import axios from "axios";
import useSWR from "swr"

const fetcher = (url: string, query?: Record<string, string>) => 
    axios.get(
        url, 
        { 
            timeout: 10000, 
            params: { ...query }
        }).then((res) => res.data);

export const useSwrAxios = (url: string, query?: any) => {
     const { data, error, mutate, isLoading } = useSWR([url, query], ([url, query]) => fetcher(url, query), { loadingTimeout: 10000 });
     return { data, error , mutate, isLoading };
}