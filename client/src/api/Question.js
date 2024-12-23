import axios from "axios";
export const getQuestionInAdminExam=async()=>{
    const response=await axios.get(`http://localhost:3000/questions`);
    return response.data;
}
export const getAllQuestions=async(string)=>{
    const response=await axios.get(`http://localhost:3000/questions?${string}`);
    return response.data;
}
export const getFilterQuestions=async(string)=>{
    const response=await axios.get(`http://localhost:3000/questions?${string}`);
    return response.data;
}
export const createQuestion=async(data)=>{
    const response = await axios.post('http://localhost:3000/questions',data);
}
export const updateQuestion=async(data)=>{
    const response = await axios.patch(`http://localhost:3000/questions/${data.id}`,data);
}
export const deleteQuestion=async(dataId) => {
    await axios.delete(`http://localhost:3000/questions/${dataId}`);
};
export const getAllQuestionsInUser=async()=>{
    const response=await axios.get(`http://localhost:3000/questions`);
    return response.data;
}