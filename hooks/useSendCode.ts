import { sendCode as sendCodeApi } from '@/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { toast } from 'sonner-native';

export function useSendCode() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: sendCode, isPending: isLoading } = useMutation({
    mutationFn: sendCodeApi,
    onSuccess: () => {
      toast.success('Confirmation code sent, please check your Email');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Please provide a valid email');
    },
  });

  return { sendCode, isLoading };
}
