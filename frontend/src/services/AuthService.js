import api from "../Api/Api"; // Aapka Axios instance

export const registerUser = async (formData) => {
  try {
    const response = await api.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (err) {
  
    const errorMessage =
      err.response?.data?.message || err.message || "Something went wrong";
    console.error("API Register Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/user/login", userData);

    return response.data;
  } catch (err) {
    const error =
      err.response?.data?.message || err.message || "Something went wrong";

    console.error("API login error:", error);

    throw new Error(error);
  }
};
