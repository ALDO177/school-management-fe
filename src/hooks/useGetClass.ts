import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useGetClass<TYPE>() {

    const [classes, setClasses] = useState<Array<TYPE>>();
    const [loadingClass, setIsLoadingClass] = useState<boolean>(false)

    const getDataClass = useCallback(() => {
        axios.get('/api/master/classes', { timeout: 300000 }).then((res) => {
            setClasses(res.data?.data);
            setIsLoadingClass(false);
        });
    }, []);

    useEffect(() => {
        setIsLoadingClass(true);
        getDataClass()
    }, []);

    return { classes, loadingClass, setClasses };
}