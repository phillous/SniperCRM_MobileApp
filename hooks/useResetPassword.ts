import { resetPassword as resetPasswordApi } from '@/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { toast } from 'sonner-native';

export function useResetPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Password succesfully reset');
      router.push('/passcode');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Passwords doesnt match');
    },
  });

  return { resetPassword, isLoading };
}
