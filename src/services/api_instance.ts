import axios, { AxiosError, AxiosResponse, GenericAbortSignal } from "axios";
import { AppStorage, envLoader } from "../utils";

export interface ApiRequestModel {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    customUrl?: string;
    headerOptions?: 'GOOGLE' | 'FACEBOOK' | 'TIKTOK';
    contentType?: 'multipart/form-data' | 'application/json';
    signal?: GenericAbortSignal | undefined
}

export async function ApiInstance(reqModal: ApiRequestModel): Promise<AxiosResponse<any, any> | AxiosError> {
    const token = new AppStorage().getToken();
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiZDJiM2EwMmUtNzE2MC00NTMzLTk5MGEtZDBhOWY5MDk3Yjk1IiwidXNlcm5hbWUiOiJXYWkgTWFyIEx3aW4ifSwiaWF0IjoxNzE5OTc2ODc1LCJleHAiOjE3MTk5ODA0NzV9.Pw6Z9Q8G9KPzTiQIDWvsRJfX6M5NanI6KJf3oKqevvw`
    try {
        const response = await axios({
            signal: reqModal.signal,
            method: reqModal.method,
            url: reqModal.customUrl ? reqModal.customUrl : `${envLoader.baseURL}/${reqModal.url}`,
            data: reqModal.data,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': reqModal.contentType ? reqModal.contentType : 'application/json',
                Accept: 'application/json',
                social_source: reqModal.headerOptions
            }
        });

        if (response.data) {
            // console.log(`data: ${JSON.stringify(response.data)}`);
        }
        return response;
    } catch (error) {
        const errorAxios: AxiosError = error as AxiosError;
        // console.error('api instance error', errorAxios.code === 'ERR_NETWORK');
        return errorAxios
    }
}
