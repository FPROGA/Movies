import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { getUser } from "../../api/User";

export function useGetUser() {
  const query = useQuery(
    {
      queryKey: ["getUser"],
      queryFn: ()=> getUser(),
      staleTime: 1000 * 60 * 5, 
    },
    queryClient
  );

  if (query.isError) {
    console.error("Ошибка получения пользователя:", query.error);
  } else if (query.isSuccess) {
    console.log("Данные пользователя:", query.data);
  }

  return query;
}
