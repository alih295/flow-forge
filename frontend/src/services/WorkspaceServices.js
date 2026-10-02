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
    console.error("fetch workspace api error ", err.message ,  error);
    throw new Error();
  }
};
