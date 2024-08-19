import { useContext, useEffect, useState } from "react"
import { AppContext } from "../providers/app.provider";
import { ApiInstance } from "../services";
import { ApiRequestModel } from '../services/api_instance';
import { IReturnPayload } from "../models";

const useApi = (name?: string) => {

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [rawData, setRawData] = useState<IReturnPayload>();
    const { loadingControl, logout } = useContext(AppContext);

    const sendRequest = async (reqModal: ApiRequestModel): Promise<IReturnPayload | undefined> => {
        loadingControl(true);
        try {
            let fetched = await ApiInstance(reqModal);
            loadingControl(false);
            // console.log(fetched)
            if (fetched) {
                if (fetched.status === 401) {
                    alert('Session Expired! PlEASE Login Again!');
                    logout();
                }
                if (fetched?.status === 400) {
                    setError(fetched?.data.message);
                } else {
                    setError(undefined)
                }

                if (fetched?.status === 200) {
                    setData(fetched?.data.result)
                    setRawData(fetched.data)
                } else {
                    setData(undefined)
                }
            }
            return fetched?.data as IReturnPayload;
        } catch (err) {
            console.log('error', err);
            setError("Error");
            loadingControl(false);
        }
    }

    useEffect(() => { }, [rawData, data, error])

    return { data, sendRequest, error, rawData }
}

export default useApi;
