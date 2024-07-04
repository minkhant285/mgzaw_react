import axios, { AxiosError } from "axios";
import { AppStorage, envLoader } from "../utils";

export interface ApiRequestModel {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    customUrl?: string;
    headerOptions?: 'GOOGLE' | 'FACEBOOK' | 'TIKTOK'
}

export async function ApiInstance(reqModal: ApiRequestModel) {
    const token = new AppStorage().getToken();
    try {
        const response = await axios({
            method: reqModal.method,
            url: reqModal.customUrl ? reqModal.customUrl : `${envLoader.baseURL}/${reqModal.url}`,
            data: reqModal.data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                social_source: reqModal.headerOptions
            },
        });

        if (response.data) {
            // console.log(`data: ${JSON.stringify(response.data)}`);
        }
        return response;
    } catch (error) {
        const errorAxios: AxiosError = error as AxiosError;
        // console.error('error', errorAxios.response?.status);
        return errorAxios.response
    }
}
