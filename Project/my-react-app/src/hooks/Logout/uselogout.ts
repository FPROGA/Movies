import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { stopUser } from "../../api/User";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/AuthSlice";

export function uselogout() {
  const dispatch = useDispatch();
  
  const logoutMutation = useMutation({
        mutationFn: stopUser,
        onSuccess() {
         dispatch(logout());
         queryClient.clear();
         window.location.reload();
      },
        onError: ()=>console.log('error'),
    }, queryClient);
  
  return logoutMutation;
}
