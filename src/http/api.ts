import { http } from './index';

export class api {
    static async get (url: string, args: object, headers: object = {}) {
        let result = {
            status: false,
            data: [],
            error: '',
        };
        try {
            const res = await http.get(url, { params: { ...args}, headers : {...headers} })
            console.log('res', res)
            if (res.status === 200) {
                result.status = true;
                result.data = res.data;
            }
        } catch (e: any) {
            console.log('error', e.response.data.error)
            result.error = e.response.data.message
        }
        return result;
    }

    static async post (url: string, data: object) {
        let result = {
            status: false,
            data: [],
            error: ''
        };
        try {
            const res = await http.post(url, data )
            console.log('res', res)
            if (res.status === 200) {
                result.status = true;
                result.data = res.data;
            }
        } catch (e: any) {
            if(e.response.data.hasOwnProperty("message")){
                result.error = e.response.data.message
                return result
            }
            result.error = e.response.data
            return result
        }
        return result
    }

    static async put (url: string, data: object, headers: object = {}) {
        let result = {
            status: false,
            data: [],
            error: ''
        };
        try {
            const res = await http.put(url, data, { headers : {...headers} });
            if (res.status === 200) {
                result.status = true;
                result.data = res.data;
            }
        } catch (e: any) {
            console.log('error', e.response.data.error)
            result.error = e.response.data.message
            return result
        }
        return result;
    }

}
