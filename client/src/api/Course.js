import axios from "axios";
export const getAllCourses=async()=>{
    const response=await axios.get(`http://localhost:3000/courses`);
    return response.data;
}
export const deleteCourse=async(courseId) => {
    return await axios.delete(`http://localhost:3000/courses/${courseId}`);
};
export const createCourse = async (data) => {
    const response = await axios.post('http://localhost:3000/courses',data);
};
export const updateCourse = async (data) => {
    const response = await axios.patch(`http://localhost:3000/courses/${data.id}`,data);
};
