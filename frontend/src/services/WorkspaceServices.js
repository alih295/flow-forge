import api from "../Api/Api";

export const createWorkspace = async (workspaceData) => {
  try {
    const response = await api.post("/workspace/create", workspaceData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error(err.message);
    throw new Error(error);
  }
};

export const fetchWorkspace = async (page, limit) => {
  try {
    const response = await api.get("/workspace/get", {
      params: { page, limit },
    });
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("fetch workspace api error ", err.message, error);
    throw new Error();
  }
};

export const fetchWorkspaceById = async (id) => {
  try {
    const response = await api.get(`/workspace/by-id/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message || "somehing went wrong";
    console.error(err.message);
    throw new Error(error);
  }
};
export const fetchAvailabeUser = async (id) => {
  try {
    const response = await api.get(`/workspace/${id}/available-user`);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("available user errror", err.message);
    throw new Error(error);
  }
};

export const addWorkspaceMember = async (workspaceData, id) => {
  try {
    const response = await api.post(
      `/workspace/${id}/add-members`,
      workspaceData,
    );
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("add workspace member api error is ", err.message);
    throw new Error(error);
  }
};

export const deleteWorkspace = async (id) => {
  try {
    const response = await api.delete(`/workspace/${id}/delete`);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("workspace delete api error is ", err.message);
    throw new Error(error);
  }
};
