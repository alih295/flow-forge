import api from "../Api/Api";

export const getNotification = async () => {
  try {
    const response  =await api.get('/notifications')    
    const data = response.data
    
        return data
    

  } catch (err) {
    const error = err?.response?.data?.message;
    console.log("notification Error is:", err.message);
    throw new Error(error);
  }
};
