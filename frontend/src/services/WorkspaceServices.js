import api from "../Api/Api"

export const createWorkspace = async(workspaceData)=>{
    try{
        const response = await api.post('/workspace/create' , workspaceData)
        const data = response.data
        console.log(data)
        return data

    }catch(err){
        const error = err.response.data.message
        console.error(err.message)
        throw new Error(error)
    }
}