import api from "../Api/Api"

export const adminDashboard = async()=>{
    try{
        const response = await api.get('/admin/dashboard')
        const  data = response.data
        return data

    }catch(err){
       const error = err.response.data.message||err.message || 'something went wrong'
    console.error('get admin dashboard api  error' , error)
    throw new Error(error)
    }
}