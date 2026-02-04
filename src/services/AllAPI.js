import serverURL from './BaseURL'
import commonAPI from './CommonAPI'

// registerApI
export const registerAPI=async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/auth/register`,reqBody)

}
//loginapi
export const loginAPI=async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/auth/login`,reqBody)

}
