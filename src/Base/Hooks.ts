import { AxiosRequestConfig } from 'axios';
import BaseUrl from './baseUrl';

export const GetHook = async (url:string, params?:AxiosRequestConfig<unknown>)=>{
    const res = await BaseUrl.get(url,params)
    return res?.data
}

export const PostHook = async (url:string, body?:unknown, params?:AxiosRequestConfig<unknown>)=>{
    const res = await BaseUrl.post(url,body,params)
    return res?.data
}

export const PutHook =async (url: string, body?:unknown, params?: AxiosRequestConfig<unknown>) =>{
        const res = await BaseUrl.put(url,body,params)
        return res?.data
}

export const DeleteHook =async (url: string, params?: AxiosRequestConfig<unknown>)=>{
    const res = await BaseUrl.delete(url,params)
    return res?.data
}