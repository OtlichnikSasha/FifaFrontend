import { http } from './index';

export class api {
    static async get (url: string, args: object) {
        let result = {
            status: false,
            data: [],
            error: '',
        };
        try {
                const res = await http.get(url, { params: { ...args } })
            console.log('res', res)
            if (res.status === 200) {
                result.status = true;
                result.data = res.data;
            }
        } catch (e: any) {
            console.log('error', e.response.data.error)
            result.error = e.response.data.error
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
            const res = await http.post(url, data)
            console.log('res', res)
            if (res.status === 200) {
                result.status = true;
                result.data = res.data.result;
            }
        } catch (e: any) {
            console.log('e.response', e.response)
            console.log('error', e.response.data.error)
            result.error = e.response.data.error
            return result
        }
        return result
    }

    static async put (url: string, data = {}, args: object) {
        let result = {
            status: false,
            data: [],
            error: ''
        };
        try {
            const res = await http.put(url, data, { params: { ...args } });
            if (res.status === 200) {
                result.status = true;
                result.data = res.data.result;
            }
        } catch (e: any) {
            console.log('e.response', e.response)
            console.log('error', e.response.data.error)
            result.error = e.response.data.error
            return result
        }
        return result;
    }

}
