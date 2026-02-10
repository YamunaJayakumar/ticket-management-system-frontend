import axios from "axios"
const commonAPI = async (httpMethod, url, reqBody, reqHeader, queryParams) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
        params: queryParams
    }
    return await axios(reqConfig).then(res => res).catch(err => err)
}
export default commonAPI