import { useUserInfo } from "./userStore"
import { useAuthStore } from "./authStore"
export const clearStateStorage= ()=>{
 useAuthStore.persist.clearStorage()
 useUserInfo.persist.clearStorage()
}