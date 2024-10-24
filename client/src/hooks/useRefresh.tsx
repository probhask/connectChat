import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import api from "Api";
import axiosError from "@utils/AxiosError/axiosError";
import { updateAccessToken } from "@store/slices/authSlice";
import { useEffect } from "react";

// const useRefreshToken = () => {
//   const dispatch = useChatAppDispatch();

const refreshToken = async (controller: AbortController) => {
  try {
    const response = await api.get("/auth/refresh", {
      signal: controller.signal,
    });
    const newAccessToken = response.data.accessToken;
    // code to store in redux
    // dispatch(updateAccessToken(newAccessToken));
    return newAccessToken;
  } catch (error) {
    axiosError(error);
  }
};
//   return refreshToken;
// };

// const maxRetries = 10;
const useRefresh = () => {
  const controller = new AbortController();
  const dispatch = useChatAppDispatch();
  // const refreshToken = useRefreshToken();
  const authAccessToken = useChatAppSelector((store) => store.auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // setCount((prev) => prev++);
    // console.error("count count count updated", count);

    //request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const accessToken = authAccessToken; //redux
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //get refresh token

    // response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          if (prevRequest.url === "/auth/refresh") {
            // toast.error("Session Expired Login Again");
            navigate("/auth/login", {
              replace: true,
              state: { from: location },
            });
            return Promise.reject(error);
          }
          prevRequest.sent = true;
          const newAccessToken = await refreshToken(controller);
          if (newAccessToken) {
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            dispatch(updateAccessToken(newAccessToken));
          }
          return api(prevRequest);
        }
        if (error.code !== "ERR_CANCELED" && error.status === 401) {
          navigate("/auth/login", { replace: true, state: location.pathname });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
      controller.abort();
    };
  }, []);

  return api;
};

export default useRefresh;
