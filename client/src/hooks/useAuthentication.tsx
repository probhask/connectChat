import { addAuthData, logoutUser } from "@store/slices/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH } from "types";
import { Axios } from "Api";
import axiosError from "@utils/AxiosError/axiosError";
import toast from "react-hot-toast";
import useFetchData from "./useFetchData";

const useAuthentication = () => {
  const user = useChatAppSelector((store) => store.auth);
  const dispatch = useChatAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  ////////////////////////////////////////////////////////////////
  //login user
  const [loginResp, loginLoading, loginError, loginUser, abortLogin] =
    useFetchData<AUTH>("/auth/login", "POST");
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      if (!email || !password) {
        console.error("email and password are required");
        return;
      }
      loginUser({
        data: { email, password },
      });
    },
    [loginUser]
  );

  useEffect(() => {
    if (loginResp && loginResp && loginResp._id && !loginLoading) {
      dispatch(addAuthData({ ...loginResp }));
      toast.success("Login successful");
      toast.loading("Redirecting...", { duration: 1000 });
      setTimeout(() => {
        navigate(location?.state?.from || "/", { replace: true });
      }, 1000);
    }
  }, [loginResp, loginLoading, dispatch, navigate]);
  useEffect(() => {
    if (loginError && !loginLoading) {
      toast.error(`Error ${loginError}`);
    }
  }, [loginError, loginLoading]);

  ////////////////////////////////////////////////////////////////
  //register user
  const [
    registerResp,
    registerLoading,
    registerError,
    registerUser,
    abortRegister,
  ] = useFetchData<AUTH>("/auth/register", "POST");
  const handleRegister = useCallback(
    async (username: string, email: string, password: string) => {
      if (!email || !password || !username) {
        console.error("username, email and password are required");
        return;
      }
      registerUser({
        data: { email, password, username },
      });
    },
    [registerUser]
  );

  useEffect(() => {
    if (
      registerResp &&
      registerResp.accessToken &&
      registerResp._id &&
      !registerLoading
    ) {
      dispatch(addAuthData({ ...registerResp }));
      toast.success("Register successful");
      toast.loading("Redirecting...", { duration: 1000 });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }
  }, [registerResp, registerLoading, dispatch, navigate]);
  useEffect(() => {
    if (registerError && !registerLoading) {
      toast.error(`Error ${registerError}`);
    }
  }, [registerError, registerLoading]);

  ////////////////////////////////////////////////////////////////////////
  //logout
  const handleLogoutUser = useCallback(async () => {
    setLogoutLoading(true);

    try {
      const response = await Axios.post("/auth/logout", { userId: user._id });
      console.log("resp ", response);
      if (response.status === 204) {
        dispatch(logoutUser());
        toast.success("Already logged out");
        navigate("/auth/login");
      } else if (response.data.success) {
        dispatch(logoutUser());
        toast.success("logout successful");
        navigate("/auth/login");
      }
    } catch (error) {
      axiosError(error);

      toast.error(`Error logout failed`);
    } finally {
      setLogoutLoading(false);
    }
  }, [user._id, dispatch, navigate]);

  useEffect(() => {
    return () => {
      // abortLogout();
      abortLogin();
      abortRegister();
    };
  }, []);
  return {
    //login
    loginLoading,
    handleLogin,

    //register
    handleRegister,
    registerLoading,

    //logout
    logoutLoading,
    handleLogoutUser,
  };
};

export default useAuthentication;
