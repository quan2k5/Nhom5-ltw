import axios from "axios";
export const createComment=(async(data)=>{
    const response =await axios.post('http://localhost:3000/comments',data);
});
export const getFilterComments=(async(str)=>{
    const response=await axios.get(`http://localhost:3000/comments?${str}`);
    return response.data;
})
export const updateComment = async (data) => {
    const response = await axios.patch(`http://localhost:3000/comments/${data.id}`,data);
};
export const deleteComment=async(id)=>{
    axios.delete(`http://localhost:3000/comments/${id}`);
}