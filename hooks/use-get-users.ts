import { api } from "@/core/api";
import { useQuery } from "@tanstack/react-query";

const getUsersFn = async () => {
  const { data } = await api.get<any>("/api/users");

  return data;
};

interface UseUsersOptions {
  initialData?: any[];
}

export const useUsersQueryKey = ["users"];

export const useUsers = ({ initialData }: UseUsersOptions = {}) => {
  const query = useQuery({
    queryKey: useUsersQueryKey,
    queryFn: getUsersFn,
    initialData,
  });

  return query;
}