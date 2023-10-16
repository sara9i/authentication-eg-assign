export const getAxiosError = (error) => ({
  error: error?.response?.data?.message || 'Something went wrong!'
});

export const getQueryStrFromObj = (obj) => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
};
