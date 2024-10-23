import { AxiosRequestConfig, Method } from "axios";
import { getErrorMessage, getErrorStatus } from "@utils/AxiosError/axiosError";
import { useCallback, useEffect, useRef, useState } from "react";

import useRefresh from "./useRefresh";

const useFetchData = <T,>(
  url: string,
  method: Method = "GET",
  options?: AxiosRequestConfig,
  loadOnInitial: boolean = false
): [
  T | null, //data
  boolean, //loading
  string | null, //error
  (customOptions?: AxiosRequestConfig) => void, //fetchData function
  () => void, //abortRequest function
  number | undefined, //status,
  unknown
] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<unknown | null>(null);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const api = useRefresh();

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (customOptions?: AxiosRequestConfig) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setDetailError(null);
      setError(null);
      try {
        const response = await api({
          url,
          method,
          ...options,
          ...customOptions,
          signal: controller.signal,
        });
        console.log("useFetchData response", response.data);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setStatus(response.data.status);
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (error) {
        setError(getErrorMessage(error));
        setStatus(getErrorStatus(error));
        setDetailError(error);
        // axiosError(error);
      } finally {
        setLoading(false);
      }
    },
    [url, method, options, api]
  );

  const abortRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    if (loadOnInitial) {
      fetchData();
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [loadOnInitial, controllerRef]);

  return [data, loading, error, fetchData, abortRequest, status, detailError];
};

export default useFetchData;
