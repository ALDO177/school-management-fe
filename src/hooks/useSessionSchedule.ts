
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useSessionSchedule<TYPE>() {

    const [sessions, setSessions] = useState<Array<TYPE>>();
    const [loadingSession, setLoadingSession] = useState<boolean>(false)

    const getDataClass = useCallback(() => {
        axios.get('/api/master/sessions/masters', { timeout: 300000 }).then((res) => {
            setSessions(res.data?.data);
            setLoadingSession(false);
        });
    }, []);

    useEffect(() => {
        setLoadingSession(true);
        getDataClass()
    }, []);

    return { sessions, loadingSession, setSessions };
}