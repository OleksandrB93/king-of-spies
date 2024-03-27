import { api } from "@/core/api";
import { User } from "@prisma/client";
import { useQueries, useQuery } from "@tanstack/react-query";

const getUserByEmailsFn = async (emails: string[]) => {
  const { data } = await api.get<User[]>("/api/users/by-emails", {
    params: {
      emails: emails,
    },
  });

  return data;
};

interface IUserOptions {
  emails: string[];
}

export const useUsersQueryKey = ["users"];

export const useGetUsersByEmails = (emails: string[]) => {
  const queries = useQuery({
    queryKey: useUsersQueryKey,
    queryFn: () => getUserByEmailsFn(emails),
    enabled: !!emails.length,
  });

  return queries;
};
