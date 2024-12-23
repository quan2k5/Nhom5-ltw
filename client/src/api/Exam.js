import axios from "axios";
export const getAllExams=async()=>{
    const response=await axios.get(`http://localhost:3000/exams`);
    return response.data;
}
export const getSearchExams=async(string)=>{
    const response = await axios.get(`http://localhost:3000/exams?${string}`);
    return response.data;
}
export const createExam = async (data) => {
    const response = await axios.post('http://localhost:3000/exams',data);
};
export const updateExam = async (data) => {
    const response = await axios.patch(`http://localhost:3000/exams/${data.id}`,data);
};
export const deleteExam=async(dataId) => {
    await axios.delete(`http://localhost:3000/exams/${dataId}`);
};

