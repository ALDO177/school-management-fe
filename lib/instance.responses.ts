

interface PropsResponses{
    httpCode?: number;
    message?: string;
    error?: boolean;
    data ?: any;
}

export const instancesResponse = ({ httpCode = 200, message= "Success!", error, data = null } : PropsResponses) => {
    return { httpCode, message, error: httpCode >= 400 , data };
}