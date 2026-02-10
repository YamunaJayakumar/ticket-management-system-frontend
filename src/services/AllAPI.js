import serverURL from './BaseURL'
import commonAPI from './CommonAPI'

// registerApI
export const registerAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/auth/register`, reqBody)

}
//loginapi
export const loginAPI = async (reqBody) => {
  return await commonAPI('POST', `${serverURL}/auth/login`, reqBody)

}
//------------------------------auth user------------------------------
//create ticket
export const CreateTicketAPI = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/ticket/create`, reqBody, reqHeader)

}
//view ticketslist by admin and user
export const getTicketsListAPI = async (queryParams, reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/ticket/list`,
    "",
    reqHeader,
    queryParams
  );
};
//view ticket details
export const viewTicketAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/ticket/${id}`,
    "",
    reqHeader
  );
};
//update ticket
export const updateTicketAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PATCH",
    `${serverURL}/ticket/update/${id}`,
    reqBody,
    reqHeader
  );
};
//get dashboard data
export const getDashboardAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/dashboard`,
    "",
    reqHeader
  );
};

//--------------------admin--------------------------
//get agent list
export const getAgentListAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/admin/agents`,
    "",
    reqHeader
  );
};
export const addAgentAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/admin/agents`,
    reqBody,
    reqHeader
  );
};
export const updateAgentAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/admin/agents/${id}`,
    reqBody,
    reqHeader
  );
};
export const removeAgentAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/admin/agents/${id}`,
    {},
    reqHeader
  );
};

//get agent details
export const getAgentDetailsAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/admin/agents/${id}`,
    {},
    reqHeader
  );
};
//----------------------------settings----------------------------------
//get categories
export const getCategoriesAPI = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/settings/categories`, {}, reqHeader)

}
// ------------------------priority-----------------------------------------
//add priorites
export const addPrioritiesAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/settings/priorities`, reqBody, reqHeader);
};
//get priorites
export const getPrioritiesAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/settings/priorities`, {}, reqHeader);
};
//update priorites
export const updatePrioritiesAPI = async (id, reqHeader, reqBody) => {
  return await commonAPI("PUT", `${serverURL}/settings/priorities/${id}`, reqBody, reqHeader);
};
//delete priorites
export const deletePrioritiesAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE", `${serverURL}/settings/priorities/${id}`, {}, reqHeader);
};
// ------------------------status----------------------------------
//get status 
export const getStatusAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/settings/statuses`,
    {},
    reqHeader
  );
};
//add status
export const addstatusAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/settings/statuses`,
    reqBody,
    reqHeader
  );
};
//update status
export const updatestatusAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/settings/statuses/${id}`,
    reqBody,
    reqHeader
  );
};
//delete status
export const deleteStatusAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/settings/statuses/${id}`,
    {},
    reqHeader
  );
};


// -------------------------------------specializations----------------------------------
//get specializations
export const getSpecializationsAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/settings/specializations`,
    {},
    reqHeader
  );
};
//add specializations
export const addSpecializationsAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/settings/specializations`,
    reqBody,
    reqHeader
  );
};
//toggle specializations
export const toggleSpecializationAPI = async (id, reqHeader) => {
  return await commonAPI(
    "PATCH",
    `${serverURL}/settings/specializations/${id}/toggle`,
    {},
    reqHeader
  );
};

// -------------------------------------teams----------------------------------
//get teams
export const getTeamsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/settings/teams`, {}, reqHeader);
};

//add team
export const addTeamAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/settings/teams`, reqBody, reqHeader);
};

//update team
export const updateTeamAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/settings/teams/${id}`,
    reqBody,
    reqHeader
  );
};

//delete team
export const deleteTeamAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/settings/teams/${id}`,
    {},
    reqHeader
  );
};

// -------------------------------------categories------------------------------
//add category
export const addCategoriesAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/settings/categories`,
    reqBody,
    reqHeader
  );
};

//update category
export const updateCategoriesAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/settings/categories/${id}`,
    reqBody,
    reqHeader
  );
};

//delete category
export const deleteCategoryAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/settings/categories/${id}`,
    {},
    reqHeader
  );
};

//add member to team
export const addMemberToTeamAPI = async (teamId, memberId, reqHeader) => {
  return await commonAPI(
    "PATCH",
    `${serverURL}/settings/teams/${teamId}/add-member`,
    { memberId },
    reqHeader
  );
};

// get all users (admin only)
export const getAllUsersAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/admin/users`,
    "",
    reqHeader
  );
};
