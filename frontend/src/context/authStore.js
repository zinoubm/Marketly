import { create } from "zustand";
import {persist , createJSONStorage} from "zustand/middleware"
export const useAuthStore = create(
    persist((set , get)=>({
    first_name:get()?.first_name || "", 
    last_name:get()?.last_name || "", 
    username:get()?.username || "" , 
    setFirstName:(first_name)=>set({first_name}),
    setLastName:(last_name)=>set({last_name}),
    setUsername:(username)=>set({username}) 
}) , {
    name:"authStore" , 
    storage : createJSONStorage(()=>sessionStorage)
}))