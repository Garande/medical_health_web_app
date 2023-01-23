import { AxiosInstance } from "axios";

export const fetchDocs = async (api: AxiosInstance, url: string) => {
    return new Promise((resolve: ({ data, next }: { data: any[], next: string | undefined | null, previous: string | undefined | null }) => void, reject) => {
        api.get(url).then(({ data }) => {
            // 
            resolve({ data: data, next: data.next, previous: data.previous })
        }).catch(error => {
            reject(error.code != 'ERR_NETWORK' ? (error.response?.data || error.message) : error.message);;
        })
    })
}


export const fetchSingleDoc = async (api: AxiosInstance, url: string) => {
    return new Promise((resolve: ({ data }: { data: any }) => void, reject) => {
        api.get(url).then(({ data }) => {

            resolve({ data: data })
        }).catch(error => {
            reject(error.code != 'ERR_NETWORK' ? (error.response?.data || error.message) : error.message);;
        })
    })
}


export const deleteDoc = async (api: AxiosInstance, url: string) => {
    return new Promise((resolve: ({ data }: { data: any }) => void, reject) => {
        api.delete(url).then(({ data }) => {
            resolve({ data })
        }).catch((error) => {
            reject(error.code != 'ERR_NETWORK' ? (error.response?.data || error.message) : error.message);
        })
    })
}


export const updateDoc = (api: AxiosInstance, url: string, data: any, isformData?: boolean) => {
    return new Promise((resolve: ({ data }: { data: any }) => void, reject) => {
        let body = isformData == true ? data : JSON.parse(JSON.stringify(data));

        let config = {
        }

        if (isformData == true) {
            config = {
                headers: {
                    "Contect-type": "multipart/form-data",
                    common: { 'X-Requested-With': 'XMLHttpRequest' }
                },
            }
        }



        api.put(url, body, config).then(({ data }) => {
            resolve({ data })
        }).catch((error => {
            reject(error.code != 'ERR_NETWORK' ? (error.response?.data || error.message) : error.message);
        }))
    })
}

export const uploadDoc = (api: AxiosInstance, url: string, data: any, isformData?: boolean) => {
    return new Promise((resolve: ({ data }: { data: any }) => void, reject) => {
        let body = isformData == true ? data : JSON.parse(JSON.stringify(data));

        let config = {}

        if (isformData == true) {
            config = {
                headers: {
                    "Contect-type": "multipart/form-data",
                    common: { 'X-Requested-With': 'XMLHttpRequest' }
                },
            }
        }



        api.post(url, body, config).then((data) => {
            resolve({ data })
        }).catch((error => {
            // 
            reject(error.code != 'ERR_NETWORK' ? (error.response?.data || error.message) : error.message);
        }))
    })
}