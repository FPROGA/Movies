import { useQuery } from "@tanstack/react-query";
import { getFavourites } from "../../api/Favourites";
import { queryClient } from "../../api/queryClient";

export function useGetFav() {
  const query =  useQuery({
    queryFn: () =>  getFavourites(),
    queryKey: ['favourites'],
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