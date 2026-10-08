import api from "../Api/Api";
export const createTask = async (taskData, id) => {
  try {
    const response = await api.post(`workspaces/${id}/tasks`, taskData);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("task creation api error is", err.message);
    throw new Error(error);
  }
};

export const fetchWorkspaceMember = async (id) => {
  try {
    const response = await api.get(`/workspace/${id}/members`);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("fetch workspace member error is", err.message);
    throw new Error(error);
  }
};
