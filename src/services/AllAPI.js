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
//------------------------------auth user------------------------------
//create ticket
export const CreateTicketAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${serverURL}/ticket/create`,reqBody,reqHeader)

}
//get categories
export const getCategoriesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${serverURL}/settings/categories`,{},reqHeader)

}
//get priorites
export const getPrioritiesAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/settings/priorities`,
    {},
    reqHeader
  );
};
// view tickets list (admin & user)
export const getTicketsListAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/ticket/list`,
    "",
    reqHeader
  );
};
//view ticket details
export const viewTicketAPI = async (id,reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/ticket/${id}`,
    "",
    reqHeader
  );
};