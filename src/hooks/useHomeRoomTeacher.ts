import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useHomeRoomTeacher<TYPE>() {

    const [homeRoomTeacher, setHomeRoomTeacher] = useState<Array<TYPE>>();
    const [loading, setIsLoading] = useState<boolean>(false)

    const getDataClass = useCallback(() => {
        axios.get('/api/protected/user-management/home-room-teacher/master', { timeout: 300000 }).then((res) => {
            setHomeRoomTeacher(res.data?.data?.items);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getDataClass()
    }, []);

    return { homeRoomTeacher, loading, setHomeRoomTeacher };
}