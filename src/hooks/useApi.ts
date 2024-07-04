import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../providers/app.provider";
import { ApiInstance } from "../services";
import { ApiRequestModel } from '../services/api_instance';
import { IReturnPayload } from "../models";

const useApi = (name?: string) => {

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const { loadingControl, removeToken } = useContext(ThemeContext);

    const sendRequest = async (reqModal: ApiRequestModel): Promise<IReturnPayload | undefined> => {
        loadingControl(true);
        try {
            let fetched = await ApiInstance(reqModal);
            loadingControl(false);
            // console.log(fetched)
            if (fetched) {
                if (fetched.data.status_code === 401 && name === 'getUser') {
                    removeToken()
                }
                if (fetched?.data.status_code === 400 || fetched?.data.status_code === 401) {
                    setError(fetched?.data.message);
                } else {
                    setError(undefined)
                }

                if (fetched?.data.status_code === 200) {
                    setData(fetched?.data.data)
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

    useEffect(() => { }, [data, error])

    return { data, sendRequest, error }
}

export default useApi;
