import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown | AxiosError | Error) => {
  let errorMessage: string = "";

  if (error instanceof AxiosError) {
    errorMessage = error.response?.data
      ? `  ${error.response?.data?.message}`
      : `${error?.message}`;
  } else if (error instanceof Error) {
    errorMessage = `  ${error.message}`;
  } else {
    errorMessage = "An unknown error occurred";
  }
  return errorMessage;
};

export const getErrorStatus = (
  error: unknown | AxiosError | Error
): number | undefined => {
  let status: number | undefined = undefined;

  if (error instanceof AxiosError) {
    status = error.status ? error.status : error.response?.status;
    // errorMessage = error.response?.data
    //   ? `  ${error.response?.data?.message}`
    //   : `${error?.message}`;
  } else if (error instanceof Error) {
    const res = error.message.slice(
      error.message.length - 4,
      error.message.length - 1
    );
    if (res) {
      status = Number(res);
    }
  } else {
    status = undefined;
  }
  return status;
};

const axiosError = (error: unknown | AxiosError | Error) => {
  let errorMessage: string = "";

  if (error instanceof AxiosError) {
    errorMessage = error.response?.data
      ? `${error.response?.status}  ${error.response?.data?.message}`
      : `${error?.message}`;
  } else if (error instanceof Error) {
    errorMessage = ` ${error.name} ${error.message}`;
  } else {
    errorMessage = "An unknown error occurred";
  }

  throw new Error(errorMessage);
};

export default axiosError;
