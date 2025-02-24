import { createClient } from '@/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

const useGetUserSession = () => {
  return useQuery({
    queryKey: ['userSession'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

const useSignOutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
};

export { useGetUser, useGetUserSession, useSignOutUser };
