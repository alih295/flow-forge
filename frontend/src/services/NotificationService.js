import api from "../Api/Api";

export const getNotification = async (page, limit) => {
  console.log(page)
  try {
    const response = await api.get("/notifications", {
      params: { page, limit },
    });
    const data = response.data;

    return data;
  } catch (err) {
    const error = err?.response?.data?.message;
    console.log("notification Error is:", err.message);
    throw new Error(error);
  }
};

export const markAllAsRaed = async()=>{
  try{
    const response = await api.patch('/notification/read-all')
    const data = response.data
    return data

  }catch(err){
    const error = err.response.data.message
    console.error('notification api error is mark all as read' , err.message)
    throw new Error(error)
  }
}