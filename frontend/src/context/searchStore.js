import { create } from "zustand";

const useSearchStore = create((set) => ({
  category: "",
  max_price: "",
  min_price: "",
  search: "",
  setSearchState:(data)=>set({...data})
}));
