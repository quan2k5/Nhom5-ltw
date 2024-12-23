import axios from "axios";
export const getAdmin=async()=>{
    const response=await axios.get(`http://localhost:3000/admin`);
    return response.data[0];
}

export const getActiveAdmin=async(activeAdmin)=>{
    const response=await axios.patch('http://localhost:3000/admin/1',{
        status:activeAdmin,
    })
    return response.data;
}