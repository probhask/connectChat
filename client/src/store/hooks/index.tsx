import { AppDispatch, RootState } from "../index";
import { useDispatch, useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

export const useChatAppDispatch: () => AppDispatch = useDispatch;
export const useChatAppSelector: TypedUseSelectorHook<RootState> = useSelector;
