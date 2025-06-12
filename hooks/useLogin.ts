import { loginApi } from '@/apiClient';
import { loginStorage } from '@/utils/storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { toast } from 'sonner-native';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // The response contains: message, userId, name, and token
      const { token, userId, name } = data;
      console.log(token, name);
      // Store the token in MMKV storage
      if (token) {
        loginStorage.set('token', token as string);
        loginStorage.set('userId', userId);
        loginStorage.set('name', name);
      }

      // You might want to store some user data in query cache
      queryClient.setQueryData(['user'], {
        userId,
        name,
      });
      toast.success(data.message || 'Login Successful');
      router.push('/passcode');
    },
    onError: (err) => {
      console.log('ERROR', err.message);

      toast.error('Unable to connect to server, please try again');
    },
  });

  return { login, isLoading };
}
