import React, { useEffect, useState } from "react";
import useApi from "@/lib/api/useApi";
import {FormControl} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectCategorie(field) {
  
    const {getCategories}=useApi()
    const [data , setData]= useState([])
  useEffect(() => {
    (async()=>{
      const res = await getCategories()
      setData(res)
      
    })()
  }, []);
  return (
    <Select onValueChange={field.props.onChange} defaultValue={field.props.value}>
      <FormControl>

      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="categorie" />
      </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data.map(({title, id})=><SelectItem  key={id} value={`${id}`}>{title}</SelectItem>)

        }
      </SelectContent>
    </Select>
  );
}

export default SelectCategorie;
