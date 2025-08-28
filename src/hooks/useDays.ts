import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useDays<TYPE>() {

    const [days, setDays] = useState<Array<TYPE>>();
    const [loadingDay, setLoadingDay] = useState<boolean>(false)

    const getDataClass = useCallback(() => {
        axios.get('/api/master/days', { timeout: 300000 }).then((res) => {
            setDays(res.data?.data);
            setLoadingDay(false);
        });
    }, []);

    useEffect(() => {
        setLoadingDay(true);
        getDataClass()
    }, []);

    return { days, loadingDay, setDays };
}