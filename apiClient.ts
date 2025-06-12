import customFetch from '@/utils/axiosIntance';

interface StatusOrdersParams {
  period?: string; // e.g., "30 days"
  countryId: number; // country ID
}

type LoginProps = {
  username: string;
  password: string;
};

type ForgotPasswordProps = {
  email: string;
  resetCode: number;
};

type ResetPasswordProps = {
  newPassword: string;
  confirmNewPassword: string;
};

export const loginApi = async (userData: LoginProps) => {
  const response = await customFetch.post('auth/login', userData, { withCredentials: true });
  console.log('User logged:', response.data);
  return response.data;
};

export const sendCode = async (email: string) => {
  const response = await customFetch.post('auth/sendCode');
  console.log('Code sent:', response.data);
  return response.data;
};

export const forgotPassword = async (forgotPassword: ForgotPasswordProps) => {
  const response = await customFetch.post('auth/forgotPassword', forgotPassword, {
    withCredentials: true,
  });
  console.log('Password reset:', response.data);
  return response.data;
};

export const resetPassword = async (newPassword: ResetPasswordProps) => {
  const response = await customFetch.patch('auth/resetPassword', newPassword, {
    withCredentials: true,
  });
  console.log('New password', response.data);
  return response.data;
};

export const logOut = async () => {
  const res = await customFetch.delete('auth/logout', {
    withCredentials: true,
  });
  console.log(res.data);
};

export const fetchCountries = async () => {
  const response = await customFetch.get('/fetchCountries');
  console.log('Countries', response.data);
  return response.data;
};

export const fetchStatusOrders = async ({ period = '30 days', countryId }: StatusOrdersParams) => {
  const response = await customFetch.get('/dashboard', {
    params: {
      period,
      country: countryId,
    },
  });
  return response.data;
};

// [
//   {
//     "country": 83,
//     "countryName": "Ghana",
//     "countrySymbol": "GH₵",
//     "countryCurrency": "GHC",
//     "countryPhonecode": "233"
//   },
//   {
//     "country": 161,
//     "countryName": "Nigeria",
//     "countrySymbol": "₦",
//     "countryCurrency": "NGN",
//     "countryPhonecode": "234"
//   },
//   {
//     "country": 233,
//     "countryName": "United States",
//     "countrySymbol": "$",
//     "countryCurrency": "USD",
//     "countryPhonecode": "1"
//   }
// ]
