import { createStore } from "vuex"
import questions from './module/question.module'
import users from "./module/user.module"
import courses from "./module/course.module"
import subjects from "./module/subjects.module"
import exams from "./module/exam.module"
import histories from "./module/history.module"
import comments from "./module/comment.module"
const store = createStore({
    modules: {
        questions:questions,
        users:users,
        courses:courses,
        subjects:subjects,
        exams:exams,
        histories:histories,
        comments:comments,
    }
})
export default store