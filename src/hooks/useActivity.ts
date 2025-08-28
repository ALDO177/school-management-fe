
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useActivities<TYPE>() {

    const [activities, setActivity] = useState<Array<TYPE>>();
    const [loadingActivity, setLoadingActivity] = useState<boolean>(false)

    const getDataClass = useCallback(() => {
        axios.get('/api/master/activies', { timeout: 300000 }).then((res) => {
            setActivity(res.data?.data);
            setLoadingActivity(false);
        });
    }, []);

    useEffect(() => {
        setLoadingActivity(true);
        getDataClass()
    }, []);

    return { activities, loadingActivity, setActivity };
}