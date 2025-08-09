import { useQuery } from "@tanstack/react-query";
import { getRandomMovie } from "../../api/Movie";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../components/Loader";
import { MainPage } from "../MainPage/MainPage";


export const FetchRandomMovie = () => {
  const randomMovieQuery = useQuery(
    {
      queryFn: () => getRandomMovie(),
      queryKey: ["random"],
    },
    queryClient
  );

  switch (randomMovieQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка </span>
          <button onClick={() => randomMovieQuery.refetch()}>
            Попробовать еще раз
          </button>
        </div>
      );
    case "success":
      return <MainPage movie={randomMovieQuery.data}/>;
  }
};
