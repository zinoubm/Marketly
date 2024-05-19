import {create} from "zustand"
import { toast } from "sonner";

export const useRefetchDataStore =create(
    (set)=>({
        refetchData:false, 
        toggleRefetchData:()=>set((state)=>({refetchData:!state.refetchData}))
    })
)
export const useProductStore=create(
    (set)=>({
        id:0,
        title: "",
        description: "",
        category: "",
        price: "",
        inventory: "",
        product_image: "",
        quantity:1,
        reviews:[], 
        rating:0,
        incrementQuantity:()=>set(state=>{
            if (state.inventory >state.quantity) {
                
                return{ quantity:state.quantity+1}
            }
            toast.error("this product has reached the limit")
            return {state}
        }),
        decrementQuantity:()=>set(state=>{
            if(state.quantity >1)
            return {quantity:state.quantity-1}
            return {state}
        }),
        setProduct:(prod)=>set({...prod}) 
    })
) 