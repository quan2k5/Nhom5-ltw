import axios from "axios";
export const getAllUsers = async () => {
   const response=await axios.get(`http://localhost:3000/users`);
   return response.data;
};
export const getFilterUsers=async(string)=>{
    const response = await axios.get(`http://localhost:3000/users?${string}`);
    return response.data;
}
export const updateUsers=async(payload)=>{
    const response=await axios.patch(`http://localhost:3000/users/${payload.id}`,payload);
    return response.data;
}
export const createUser=async(data)=>{
    const response= await axios.post('http://localhost:3000/users',data);
}