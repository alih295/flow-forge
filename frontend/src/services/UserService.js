import api from "../Api/Api";

export const fetchUser = async (page, limit) => {
  try {
    const response = await api.get("/get-users", { params: { page, limit } });
    const data = response.data;
    return data;
  } catch (err) {
    const error = err?.response?.data?.message;
    console.error("user api error is:", err.message);
    throw new Error(error);
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`get-single-user/${id}`);
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("fetch user bu id error ", err.message);
    throw new Error(error);
  }
};
