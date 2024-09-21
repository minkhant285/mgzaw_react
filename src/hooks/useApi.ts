import { useContext, useEffect, useState } from "react"
import { AppContext } from "../providers/app.provider";
import { ApiInstance } from "../services";
import { ApiRequestModel } from '../services/api_instance';
import { IReturnPayload } from "../models";
import { AxiosError, AxiosResponse } from "axios";

const useApi = (name?: string) => {

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [rawData, setRawData] = useState<IReturnPayload>();
    const { loadingControl, logout, appErrorControl, setErrorMessageControl } = useContext(AppContext);

    const sendRequest = async (reqModal: ApiRequestModel): Promise<IReturnPayload | undefined> => {
        loadingControl(true);
        try {
            const fetched: AxiosResponse<any, any> | AxiosError = await ApiInstance(reqModal);
            const res = fetched as AxiosResponse<any, any>;
            const errRes = fetched as AxiosError<unknown, any>;

            if (errRes.code === AxiosError.ERR_NETWORK) {
                appErrorControl(true);
                setErrorMessageControl("Can't connect to video streaming server");
            }

            loadingControl(false);
            if (res) {
                if (res.status === 401) {
                    // alert('Session Expired! PlEASE Login Again!');
                    logout();
                }
                if (res?.status === 400) {
                    setError(res?.data.message);
                } else {
                    setError(undefined)
                }

                if (res?.status === 200) {
                    setData(res?.data.result)
                    setRawData(res.data)
                } else {
                    setData(undefined)
                }
            }
            return res?.data as IReturnPayload;
        } catch (err) {
            console.log(`error ${name}`, err);
            setError("Error");
            loadingControl(false);
        }
    }

    useEffect(() => { }, [rawData, data, error])

    return { data, sendRequest, error, rawData }
}

export default useApi;
