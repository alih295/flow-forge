import api from "../Api/Api";

export const createComment = async (workspaceId, taskId, data) => {
  try {
    console.log(data)
    const response = await api.post(
      `/workspace/${workspaceId}/tasks/${taskId}/comments`,
      data,
    );
    const comment = response.data;
    return comment;
  } catch (err) {
    const error = err.response.data.message;
    console.error("create comment api error ", err.message);
    throw new Error(error);
  }
};
