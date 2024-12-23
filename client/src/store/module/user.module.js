import { getAdmin, getActiveAdmin } from "../../api/Admin";
import { getAllUsers,getFilterUsers,updateUsers,createUser} from "@/api/User"; 
const users= {
  state: {
    admin:{},
    users:[],
    allUsers:[],
    currentUser:{},
  },
  mutations: {
    setData:(state, payload)=>{
      state.admin = payload;
    },
    setUser:(state,payload)=>{
     state.users=[];
      state.users.push(...payload);
    },
    setUpdateUser:(state,payload)=>{
      const findNumber=state.users.findIndex((item)=>{
        return payload.id==item.id;
      })
      if(payload.block ){
        state.users[findNumber].block=payload.block;
      }
      if(payload.status){
        state.users[findNumber].status=payload.status;
      }
    },
    setAllUser:(state,payload)=>{
      state.allUsers=[]
      state.allUsers.push(...payload);
    },
    setCurrentUser:(state,payload)=>{
      state.currentUser=payload;
    }
  },
  actions: {
    async getAdmin({ commit }) {
        const adminData = await getAdmin();
        commit('setData', adminData);
    },
    async updateActiveAdmin({ commit }, activeAdmin) {
        const updatedAdmin = await getActiveAdmin(activeAdmin);
        commit('setData', updatedAdmin);
    },
    async getFilterUsers({commit},payload){
        const users=await getFilterUsers(payload);
        commit('setUser',users);
    },
    async updateUsers({commit},payload){
      console.log(11111,payload);
      await updateUsers(payload);
      commit('setUpdateUser',payload)
    },
    async getAllUsers({commit},payload){
      const allUsers=await getFilterUsers(payload);
      commit('setAllUser',allUsers);
    },
    async getSortUsers({commit},payload){
      await getFilterUsers(payload.param1);
    },
    async updateAllUser({commit},payload){
      const newUser= await updateUsers(payload);
      commit('setCurrentUser',newUser);
    },
    async getCurrentUser({commit}){
      const users=await getAllUsers();
      const findItem=users.find((item)=>item.status==true&&item.block==true);
      commit('setCurrentUser',findItem);
    },
    async createUser({state,commit},payload){
      await createUser(payload);
      const arr=[...state.allUsers];
      arr.push(payload);
      commit('setAllUser',arr);
    }
  },

};
export default users;
