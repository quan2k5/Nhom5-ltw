import axios from "axios";
export const getAllSubjects=async()=>{
    const response=await axios.get(`http://localhost:3000/subjects`);
    return response.data;
}
export const getFilterSubjects=async (data)=>{
    console.log(1111,data);
    const response=await axios.get(`http://localhost:3000/subjects?${data}`);
    return response.data;
}
export const createSubject = async (data) => {
    const response = await axios.post('http://localhost:3000/subjects',data);
};
export const updateSubject = async (data) => {
    const response = await axios.patch(`http://localhost:3000/subjects/${data.id}`,data);
};
export const deleteSubject=async(dataId) => {
    await axios.delete(`http://localhost:3000/subjects/${dataId}`);
};
