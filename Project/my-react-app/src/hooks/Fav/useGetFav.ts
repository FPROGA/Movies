import { useQuery } from "@tanstack/react-query";
import { getFavourites } from "../../api/Favourites";
import { queryClient } from "../../api/queryClient";

export function useGetFav() {
  const query =  useQuery({
    queryFn: () =>  getFavourites(),
    retry: 1,
    queryKey: ['favourites'],
    staleTime: 60 * 1000, 
  }, queryClient);

    switch(query.status){
        case "error":
            console.log("error");
            break;
        case "success":
            console.log(query.data);
            break;
    }
    return query;
}