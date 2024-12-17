// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any) => {
  const match = err.errorResponse.errmsg.match(/"([^"]+)"/);

  const extractMessage = match[1];
  const statusCode = 400;
  const errorSources = [
    {
      path: '',
      message: `${extractMessage} is already exists`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
