import api from "../Api/Api";

export const fetchMemberDashboard = async () => {
  try {
    const response = await api.get("/dashboard/member");
    const data = response.data;
    return data;
  } catch (err) {
    const error = err.response.data.message;
    console.error("member dashboard api error is", err.message);
    throw new Error(error);
  }
};
