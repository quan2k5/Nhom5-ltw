import axios from "axios";
export const getAllHistory=async()=>{
    const response=await axios.get(`http://localhost:3000/exams`);
    return response.data;
}
export const createHistory1=async(data)=>{
    const response = await axios.post('http://localhost:3000/histories',data);
}
export const getFilterHistory=async(data)=>{
    const response=await axios.get(`http://localhost:3000/histories?${data}`);
    return response.data;
}