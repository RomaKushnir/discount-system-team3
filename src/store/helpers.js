export const getRequestState = () => ({
  loading: true,
  success: null,
  error: null
});

export const getSuccessState = (success) => ({
  loading: false,
  success,
  error: null
});

export const getErrorState = (error) => ({
  loading: false,
  success: null,
  error
});

export const getDefaultState = () => ({
  loading: false,
  success: null,
  error: null
});
