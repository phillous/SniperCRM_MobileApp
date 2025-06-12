import { forgotPassword as forgotPasswordApi } from '@/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { toast } from 'sonner-native';

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      router.push('/passcode');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Confirmation code incorrect');
    },
  });

  return { forgotPassword, isLoading };
}
