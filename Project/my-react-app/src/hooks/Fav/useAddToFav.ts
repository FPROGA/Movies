import { useMutation } from "@tanstack/react-query";
import { postFavouriteMovie } from "../../api/Favourites";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../api/queryClient";

export function useAddToFav() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (movieId: number) =>  postFavouriteMovie(movieId),
    onError: (error) => {
      if (error.message === 'Not authenticated') {
        navigate('/login');
      }
      console.log(error);
    },
    onSuccess: (data)=>{
      console.log(data)
    queryClient.invalidateQueries({ queryKey: ['favourites'] }); 
    }
  }, queryClient);
}