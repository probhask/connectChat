import { logoutUser } from "@store/slices/authSlice";
import { useChatAppDispatch } from "@store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useChatAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logoutUser());
    navigate("/auth/login");
  }, []);
};

export default Logout;
