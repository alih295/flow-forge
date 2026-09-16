import api from '../Api/Api'; // Aapka Axios instance

export const registerUser = async (formData) => {
  try {
    const response = await api.post('/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // File upload ke liye
      },
    });
    
    // Success response ka data return karein
    return response.data;

  } catch (err) {
    // Axios error response log karein (Server ka bheja hua message)
    const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
    console.error("API Register Error:", errorMessage);
    
    // Error ko aage throw karein taake handleSubmit me try...catch isey pakad sake
    throw new Error(errorMessage);
  }
};