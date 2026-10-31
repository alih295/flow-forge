import api from "../Api/Api";

export const fetchActivityLog = async (
  search,
  workspace,
  page,
  action,
  limit,
) => {
  try {
    const response = await api.get("/get-activity", {
      params: {
        page: page,
        workspace: workspace,
        action: action,
        page: page,
        limit: limit,
        search: search,
      },
    });
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("fetch activity log error is", err.message);
    throw new Error(error);
  }
};

export const getActivityWorkspaces = async () => {
  try {
    const response = await api.get("/get-activity/workspace");
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.respnse.data.message;
    console.error("get activity workspaces error is", err.mesage);
    throw new Error(error);
  }
};
