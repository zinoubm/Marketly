import { create } from "zustand";
export const useAuthStore = create((set)=>({
    first_name:null, 
    last_name:null, 
    username:null , 
    setFirstName:(first_name)=>set(()=>({first_name})),
    setLastName:(last_name)=>set(()=>({last_name})),
    setUsername:(username)=>set(()=>({username})) 
}))