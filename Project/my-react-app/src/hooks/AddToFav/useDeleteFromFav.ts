import { useMutation } from "@tanstack/react-query";
import { deleteFavouriteMovie } from "../../api/Favourites";
import { queryClient } from "../../api/queryClient";

export function useDeleteFromFav() {

  return useMutation({
    mutationFn: (movieId: number) =>  deleteFavouriteMovie(movieId),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data)=>console.log(data)
  }, queryClient);
}