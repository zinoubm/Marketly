import {create} from "zustand"
export const useRefetchDataStore =create(
    (set)=>({
        refetchData:false, 
        toggleRefetchData:()=>set((state)=>({refetchData:!state.refetchData}))
    })
)
export const useProductStore=create(
    (set)=>({
        title: "",
        description: "",
        category: "",
        price: "",
        inventory: "",
        product_image: "",
        setProduct:(prod)=>set(state=>({...prod}) ) 
    })
) 