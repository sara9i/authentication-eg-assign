export const getAxiosError = (error) => {
  return error?.response?.data?.message ?? 'Something went wrong';
};
