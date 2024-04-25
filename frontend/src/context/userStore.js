import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserInfo = create(
  persist(
    (set, get) => ({
      phone: get()?.phone || 0,
      shippingDetails: get()?.shippingDetails || "",
      billingDetails: get()?.billingDetails || "",
      image:get()?.image||"",
      updatePhone: (phone) => set({ phone }),
      updateShippingDetails: (shippingDetails) => set({ shippingDetails }),
      updateBillingDetails: (billingDetails) => set({ billingDetails }),
      updateImage:(image)=>set({image})
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
