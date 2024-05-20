import useCookie from "./useCookie";
import axios from "./axios";
import { toast } from "sonner";
const useNotificationApi=()=>{
    const { getToken } = useCookie();

    const getNotification=async ()=>{

        const token = getToken();
        const response = await axios.get("/notifications" , {
          headers:{
            accept: "application/json",
            Authorization: "Token " + token,
    
          }
        })
        return response.data
    
    }
    const seenNotification=async(id)=>{
        const token = getToken();
        
        const response = await axios.patch(`/notifications/is-seen/` ,{
            id:id
        }, {
          headers:{
            accept: "application/json",
            Authorization: "Token " + token,
    
          }
        })
            
        return response.data

    }


    return {getNotification , seenNotification}
}
export default useNotificationApi